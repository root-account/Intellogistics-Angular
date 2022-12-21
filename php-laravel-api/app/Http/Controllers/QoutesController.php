<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Qoutes;
use App\Packages;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use App\Mail\CollectionEmail;
use App\Mail\CollectionNotification;
use App\Mail\ReminderEmail;
use App\Mail\CustomEmail;

use Auth;


class QoutesController extends Controller
{

    //******************
    // List all Qoutes
    /******************/
    public function listQoutes(Request $request){

        $Qoutes = Qoutes::orderBy('date_created', 'DESC')->get();

        return response()->json($Qoutes);

    }

    //******************
    // Send Reminder
    /******************/
    public function sendReminder(Request $request){

        $Qoute = new Qoutes;


        $Qoute->email_addr = $request->email_addr;
        $Qoute->qoute_id = $request->qoute_id;
        $Qoute->destination_address = $request->destination_address;
        $Qoute->pickup_address = $request->pickup_address;
        $Qoute->service_type = $request->service_type;
        $Qoute->final_price = $request->final_price;
        $Qoute->receival_method = $request->receival_method;

        if (Mail::to($request->email_addr)->send(new ReminderEmail($Qoute))) {
            return response()->json(['status' => 'success','msg' => "Mail sent"]);

        }
    }

    //******************
    // Send Custom Email
    /******************/
    public function sendCustom(Request $request){

        $Qoute = new Qoutes;
        $Package = new Packages;

        if (Mail::to($request->email_addr)->send(new CustomEmail($Qoute, $Package))) {
            return response()->json(['status' => 'success','msg' => "Mail sent"]);
        }
    }

    //******************
    // send UPDATE
    /******************/
    public function sendUpdate(Request $request){

        $Qoute = new Qoutes;
        $Package = new Packages;

        $Qoute->qoute_id = str_replace(' ', '', $request->qoute_id);
        $Qoute->cust_name = $request->cust_name;
        $Qoute->surname = $request->surname;
        $Qoute->cellphone = $request->cellphone;
        $Qoute->email_addr = $request->email_addr;
        $Qoute->company_name = $request->company_name;
        $Qoute->destination_address = $request->destination_address;
        $Qoute->pickup_address = $request->pickup_address;
        $Qoute->collection_distance = $request->collection_distance;
        $Qoute->destination_distance = $request->destination_distance;
        $Qoute->service_type = $request->service_type;
        $Qoute->receival_method = $request->receival_method;
        $Qoute->final_price = $request->final_price;
        $Qoute->vat_price = $request->vat_price;
        $Qoute->mincharge_price = $request->mincharge_price;
        $Qoute->per_kg_price = $request->per_kg_price;
        $Qoute->fuel_price = $request->fuel_price;
        $Qoute->pickup_postal_code = $request->pickup_postal_code;
        $Qoute->branch = $request->branch;
        $Qoute->status = $request->status;
        $Qoute->note = $request->special_note;
        $Qoute->admin_weight = $request->admin_weight;
        $Qoute->admin_height = $request->admin_height;
        $Qoute->admin_length = $request->admin_length;
        $Qoute->admin_width = $request->admin_width;

        $emails = array($request->email_addr);

        if (Mail::to($emails)->send(new CollectionEmail($Qoute, $Package))) {
            return response()->json(['status' => 'success','msg' => "Mail sent"]);
        }else{
          return response()->json(['status' => 'success','msg' => "Couldn't send email."]);
        }
    }



    //******************
    // GET QUOTE BY ID
    /******************/
    public function getSingleQuote(Request $request, $waybill){

        // ->where('status', '<>', 1)
        $qoute = DB::table('qoute_details')
                     ->select(DB::raw('*'))
                     ->where('qoute_id', '=', $waybill)
                     ->orderBy('date_created', 'ASC')
                     ->first();

        $package = DB::table('packages')
                     ->select(DB::raw('*'))
                     ->where('waybill', '=', $waybill)
                     ->orderBy('date_created', 'ASC')
                     ->get();



        if ($qoute) {
          $driver = DB::table('drivers')
                       ->select(DB::raw('*'))
                       ->where('driver_id', '=', $qoute->driver_id)
                       ->first();
          $get_company = DB::table('service_providers')
                        ->select(DB::raw('*'))
                        ->where('serviceProviderID', "=" , $qoute->serviceProviderID)
                        ->first();
         $single_quote = array(
                       'qoute'     => $qoute,
                       'package'     => $package,
                       'driver'     => $driver,
                       'service_provider'  => $get_company,
                   );
        }else{
          $single_quote = array(
                        'qoute'     => $qoute,
                        'package'     => $package,
                        'service_provider'  => $get_company,
                    );
        }



        return response()->json($single_quote);

    }



    //******************
    // Get ALL transactions
    /******************/
    public function getTransactions(Request $request){

        // ->where('status', '<>', 1)
        $pending = DB::table('qoute_details')
                     ->select(DB::raw('*'))
                     ->where('payment_status', '=', 0)
                     ->orderBy('date_created', 'ASC')
                     ->get();

        $paid_online = DB::table('qoute_details')
                     ->select(DB::raw('*'))
                     ->where('payment_status', '=', 1)
                     ->orWhere('payment_status', '=', 2)
                     ->orWhere('payment_status', '=', 3)
                     ->orderBy('date_created', 'ASC')
                     ->get();

        $pickups = DB::table('qoute_details')
                     ->select(DB::raw('*'))
                     ->where('delivery_status', '=', 1)
                     ->orWhere('delivery_status', '=', 2)
                     ->orderBy('date_modified', 'ASC')
                     ->get();

        $saved = DB::table('qoute_details')
                     ->select(DB::raw('*'))
                     ->where('delivery_status', '=', 5)
                     ->orderBy('date_created', 'ASC')
                     ->get();

        $cancelled = DB::table('qoute_details')
                     ->select(DB::raw('*'))
                     ->where('payment_status', '=', 999)
                     ->orderBy('date_created', 'ASC')
                     ->get();
        $inroute = DB::table('qoute_details')
                     ->select(DB::raw('*'))
                     ->where('delivery_status', '=', 3)
                     ->orWhere('delivery_status', '=', 4)
                     ->orderBy('date_created', 'ASC')
                     ->get();


        $transactions = array(
                      'pending'     => $pending,
                      'paid_online' => $paid_online,
                      'pickups'     => $pickups,
                      'saved'       => $saved,
                      'cancelled'   => $cancelled,
                      'inroute'     => $inroute,
                  );

        return response()->json($transactions);

    }


    //******************
    // Delete a Qoute
    /******************/
    public function deleteQoute($id, Request $request){
        $Qoute = Qoutes::where('id', $id)->delete();

        if ($Qoute) {
            return response()->json(['status' => 'success','msg' => "Qoute delete"]);
        }else{
            return response()->json(['status' => 'success','msg' => "Something went wrong deleting this quote."]);
        }
    }

    /******************
    // Create new Qoute
    *******************/
    public function insertQoute(Request $request){

        $Qoute = new Qoutes;
        $Package = new Packages;

        $Qoute->qoute_id = str_replace(' ', '', $request->qoute_id);
        $Qoute->serviceProviderID = $request->serviceProviderID;
        $Qoute->cust_name = $request->cust_name;
        $Qoute->surname = $request->surname;
        $Qoute->cellphone = $request->cellphone;
        $Qoute->email_addr = $request->email_addr;
        $Qoute->company_name = $request->company_name;
        $Qoute->receiver_name = $request->receiver_name;
        $Qoute->receiver_phone = $request->receiver_phone;
        $Qoute->receiver_email = $request->receiver_email;
        $Qoute->receiver_company = $request->receiver_company;
        $Qoute->destination_address = $request->destination_address;
        $Qoute->pickup_address = $request->pickup_address;
        $Qoute->collection_branch = $request->collection_branch;
        $Qoute->destination_branch = $request->destination_branch;
        $Qoute->service_type = $request->service_type;
        $Qoute->receival_method = $request->receival_method;
        $Qoute->final_price = $request->final_price;
        $Qoute->vat_price = $request->vat_price;
        $Qoute->mincharge_price = $request->mincharge_price;
        $Qoute->per_kg_price = $request->per_kg_price;
        $Qoute->fuel_price = $request->fuel_price;
        $Qoute->pickup_postal_code = $request->pickup_postal_code;
        $Qoute->branch = $request->branch;
        $Qoute->status = $request->status;
        $Qoute->delivery_status = $request->delivery_status;
        $Qoute->payment_status = $request->payment_status;
        $Qoute->note = $request->special_note;
        $Qoute->cust_login_id = $request->cust_login_id;
        $Qoute->admin_weight = $request->admin_weight;
        $Qoute->admin_height = $request->admin_height;
        $Qoute->admin_length = $request->admin_length;
        $Qoute->admin_width = $request->admin_width;

        $qouteinput = $request->all();


        if ($Qoute->save($qouteinput)) {


          $emails = array('mekgwele@gmail.com', 'pharragetech@gmail.com');

          // Mail::to($emails)->send(new CollectionNotification($Qoute, $Package));
          //
          // if ( Mail::to($request->email_addr)->send(new CollectionEmail($Qoute, $Package)) ) {
          //   return response()->json(['status' => 'success','msg' => "Collection Request Submitted and email sent."]);
          // }else{
          //   return response()->json(['status' => 'success','msg' => "Collection Request Submitted and email failed to send."]);
          // }

          // ADD PACKAGE
          $Package = new Packages;

          $dimensions = json_decode(preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $request->packages) , true);

          // print_r($dimensions);

          $msg = "";
          $i = count($dimensions);
          $array = array();

          for ($x = 0; $x < $i; $x++) {

              $array[] = array(
              'parent_id' => $request->qoute_id,
              'waybill' => $request->qoute_id,
              // 'package_type' => $request->package_type,
              'package_desc' =>$dimensions[$x]['pack_desc'],
              'length' => $dimensions[$x]['length'],
              'height' => $dimensions[$x]['height'],
              'width' => $dimensions[$x]['width'],
              'weight' => $dimensions[$x]['weight'],
              'date_created' => date('Y-m-d H:i:s'),
              'date_modified' => date('Y-m-d H:i:s')
              );

          }

          if (DB::table('packages')->insert($array)) {
                return response()->json(['status' => 'success','msg' => "Collection Request Submitted and email failed to send."]);
          }else{
                return response()->json(['status' => 'success','msg' => "Collection Request Submitted, packages not saved and email failed to send."]);
          }


        }else{
            return response()->json(['status' => 'success','msg' => "Something went wrong while creating this quote. Contact support"]);
        }

    }

    //***********************
    // Update existing Qoute
    /***********************/
    public function updateQoute($waybill, Request $request){

        $update_data = array();
        $Package = new Packages;
        $Qoute = new Qoutes;

        if( !empty($request->input('destination_address')) ){
           $update_data['destination_address']=$request->input('destination_address');
        }
        if(!empty($request->input('pickup_address')) ){
           $update_data['pickup_address']=$request->input('pickup_address');
        }
        if(!empty($request->input('collection_branch')) ){
           $update_data['collection_branch']=$request->input('collection_branch');
        }
        if(!empty($request->input('destination_branch')) ){
           $update_data['destination_branch']=$request->input('destination_branch');
        }
        if(!empty($request->input('service_type')) ){
           $update_data['service_type']=$request->input('service_type');
        }
        if(!empty($request->input('receival_method')) ){
           $update_data['receival_method']=$request->input('receival_method');
        }
        if(!empty($request->input('final_price')) ){
           $update_data['final_price']=$request->input('final_price');
        }
        if(!empty($request->input('vat_price')) ){
           $update_data['vat_price']=$request->input('vat_price');
        }
        if(!empty($request->input('mincharge_price')) ){
           $update_data['mincharge_price']=$request->input('mincharge_price');
        }
        if(!empty($request->input('per_kg_price')) ){
           $update_data['per_kg_price']=$request->input('per_kg_price');
        }
        if(!empty($request->input('fuel_price')) ){
           $update_data['fuel_price']=$request->input('fuel_price');
        }
        if(!empty($request->input('branch')) ){
           $update_data['branch']=$request->input('branch');
        }
        if(!empty($request->input('temp_destination')) ){
           $update_data['temp_destination']=$request->input('temp_destination');
        }
        if(!empty($request->input('status')) ){
           $update_data['status']=$request->input('status');
        }
        if(!empty($request->input('driver_id')) ){
           $update_data['driver_id']=$request->input('driver_id');
        }
        if(!empty($request->input('delivery_status')) ){
           $update_data['delivery_status']=$request->input('delivery_status');

           if ( $request->input('delivery_status') == 'delivered' ) {
             $update_data['signed_by']=$request->input('signed_by');
             $update_data['signed_on']=$request->input('signed_on');
           }
        }
        if(!empty($request->input('payment_status')) ){
           $update_data['payment_status']=$request->input('payment_status');
        }
        if(!empty($request->input('delivery_note')) ){
           $update_data['delivery_note']=$request->input('delivery_note');
        }
        if(!empty($request->input('admin_weight')) ){
           $update_data['admin_weight']=$request->input('admin_weight');
        }
        if(!empty($request->input('admin_height')) ){
           $update_data['admin_height']=$request->input('admin_height');
        }
        if(!empty($request->input('admin_width')) ){
           $update_data['admin_width']=$request->input('admin_width');
        }
        if(!empty($request->input('admin_length')) ){
           $update_data['admin_length']=$request->input('admin_length');
        }
        if(!empty($request->input('modified_by')) ){
           $update_data['modified_by']=$request->input('modified_by');
        }


        $Qoute = Qoutes::where('qoute_id', $waybill)
                          ->update($update_data);

        if ($Qoute) {

            $emails = array($request->email_addr);

            return response()->json(['status' => 'success','msg' => "Waybill updated"]);

        }else{
            return response()->json(['status' => 'success','msg' => "There was a technical problem. [er-uptTRS]"]);
        }

    }



    /**************
    GENERAL USER
    **************/
    // Get transactions
    public function getUserTransactions(Request $request, $userid){

        // ------------------- //
        $pending = DB::table('qoute_details')
                     ->select(DB::raw('*'))
                     ->where('cust_login_id', '=', $userid)
                     ->where('payment_status', '=', 0)
                     ->orderBy('date_created', 'ASC')
                     ->get();

        $paid_online = DB::table('qoute_details')
                     ->select(DB::raw('*'))
                     ->where('cust_login_id', '=', $userid)
                     ->where('payment_status', '=', 1)
                     ->orWhere('payment_status', '=', 2)
                     ->orWhere('payment_status', '=', 3)
                     ->orderBy('date_created', 'ASC')
                     ->get();

        $pickups = DB::table('qoute_details')
                     ->select(DB::raw('*'))
                     ->where('cust_login_id', '=', $userid)
                     ->where('delivery_status', '=', 1)
                     ->orWhere('delivery_status', '=', 2)
                     ->orderBy('date_modified', 'ASC')
                     ->get();

        $saved = DB::table('qoute_details')
                     ->select(DB::raw('*'))
                     ->where('cust_login_id', '=', $userid)
                     ->where('delivery_status', '=', 5)
                     ->orderBy('date_created', 'ASC')
                     ->get();

        $cancelled = DB::table('qoute_details')
                     ->select(DB::raw('*'))
                     ->where('cust_login_id', '=', $userid)
                     ->where('payment_status', '=', 999)
                     ->orderBy('date_created', 'ASC')
                     ->get();
        $inroute = DB::table('qoute_details')
                     ->select(DB::raw('*'))
                     ->where('cust_login_id', '=', $userid)
                     ->where('delivery_status', '=', 3)
                     ->orWhere('delivery_status', '=', 4)
                     ->orderBy('date_created', 'ASC')
                     ->get();
       $all_trans = DB::table('qoute_details')
                    ->select(DB::raw('*'))
                    ->where('cust_login_id', '=', $userid)
                    ->orderBy('date_created', 'ASC')
                    ->get();


        $transactions = array(
                      'pending'     => $pending,
                      'paid_online' => $paid_online,
                      'pickups'     => $pickups,
                      'saved'       => $saved,
                      'cancelled'   => $cancelled,
                      'inroute'     => $inroute,
                      'all'         => $all_trans
                  );

        return response()->json($transactions);

    }

    // List all Qoutes
    public function UserListQoutes(Request $request, $userid){

        $Qoutes = DB::table('qoute_details')
                     ->select(DB::raw('*'))
                     ->where('cust_login_id', '=', $userid)
                     ->orderBy('date_created', 'ASC')
                     ->get();

        return response()->json($Qoutes);

    }


    /**************
    Track Waybill
    **************/
    // Get transactions
    public function TrackWaybill(Request $request, $waybill){

      $Qoutes = DB::table('qoute_details')
                   ->select(DB::raw('*'))
                   ->where('qoute_id', '=', $waybill)
                   ->first();
      $packages = DB::table('packages')
                  ->select(DB::raw('*'))
                  ->where('waybill', '=', $waybill)
                  ->get();

      $tracking_data = array();
      $get_provider = array();

      if ( !empty($Qoutes->serviceProviderID) ) {
        $get_provider = DB::table("service_providers")
                          ->select(DB::raw('*'))
                          ->where("serviceProviderID", "=", $Qoutes->serviceProviderID)
                          ->first();
      }



      $tracking_data = array(
                    'waybill'           => $Qoutes,
                    'service_provider'  => $get_provider,
                    'packages'          => $packages,
                );

      return response()->json($tracking_data);

    }


}
