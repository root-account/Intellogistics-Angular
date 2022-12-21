<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Customers;

use Illuminate\Support\Facades\DB;

class CustomersController extends Controller
{
  public function __construct()
   {
     // $this->middleware('auth');
   }
   /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */

    /******************
    LOGIN CUSTOMER
    ******************/
    public function authenticate(Request $request)
    {
        $this->validate($request, [
            'username' => 'required',
            'password' => 'required'
         ]);

       $user = Customers::where('username', $request->input('username'))->orWhere('user_email', $request->input('username'))->first();

      if($user != "" && Hash::check($request->input('password'), $user->password)){
       // if($user != "" && $request->input('password') == $user->password){

           $apikey = base64_encode(str_random(40));

           Customers::where('username', $request->input('username'))->update(['api_key' => $apikey]);

           $login_status = ['status' => 'success','api_key' => $apikey, 'user' => $user->user_id];

           return response()->json($login_status);

       }else{
         return response()->json(['status' => 'error', 'msg' => "Incorrect Username or password."]);
       }

    }


   /******************
   REGISTER NEW CUSTOMER
   ******************/
   public function register_customer(Request $request)
   {
     $this->validate($request, [
         'username' => 'required',
         'password' => 'required'
      ]);

        $User = new Customers;

        $apikey = base64_encode(str_random(40));

        $user_password = Hash::make($request->password);

        $User->user_id = $request->user_id;
        $User->username = $request->username;
        $User->password = $user_password;
        $User->names = $request->names;
        $User->surname = $request->surname;
        $User->phone_no = $request->phone_no;
        $User->user_email = $request->user_email;
        $User->billing_type = $request->billing_type;
        $User->accept_terms = $request->accept_terms;
        $User->user_type = $request->user_type;
        $User->api_key = $apikey;

        $user_input = $request->all();


        if (empty($User->username) || empty($User->password) ) {
            return "empty";
        }


        $check_user = Customers::where('username', $request->username)->first();

        if(!empty($check_user)){
           return response()->json(['status' => 'error','msg' => 'The email '.$request->username.' is already registered.']);
        }else{
          if ($User->save($user_input)) {
              // Mail::to($request->email_addr)->send(new MyEmail($Qoute, $Package));
              Customers::where('username', $request->username)->update(['api_key' => $apikey]);;
              // return response()->json(['status' => 'success','api_key' => $apikey, 'user' => $request->input('username')]);
              $user = Customers::where('username', $request->username)->first();
              return response()->json($user);
          }else{
              return response()->json(['status' => 'error','msg' => "Something went wrong while creating this User. Contact support"]);
          }
        }

   }


   /******************
   GET USER DETAILS
   ******************/
   public function get_user_data(Request $request, $user_id){

     $user = Customers::where('user_id', $user_id)->first();

     return response()->json($user);

   }


/********************
GET ALL CUSTOMER DATA
********************/
public function get_single_user(Request $request, $user_id){

   $details = DB::table('customers_details')
                ->select(DB::raw('*'))
                ->where('user_id', '=', $user_id)
                ->orderBy('date_created', 'DESC')
                ->first();

  $pending = DB::table('qoute_details')
               ->select(DB::raw('*'))
               ->where('cust_login_id', '=', $user_id)
               ->where('payment_status', '=', 0)
               ->orderBy('date_created', 'DESC')
               ->get();

  $paid_online = DB::table('qoute_details')
               ->select(DB::raw('*'))
               ->where('cust_login_id', '=', $user_id)
               ->where('payment_status', '=', 1)
               ->orWhere('payment_status', '=', 2)
               ->orWhere('payment_status', '=', 3)
               ->orderBy('date_created', 'DESC')
               ->get();

  $pickups = DB::table('qoute_details')
               ->select(DB::raw('*'))
               ->where('cust_login_id', '=', $user_id)
               ->where('delivery_status', '=', 1)
               ->orWhere('delivery_status', '=', 2)
               ->orderBy('date_modified', 'DESC')
               ->get();

  $delivered = DB::table('qoute_details')
               ->select(DB::raw('*'))
               ->where('cust_login_id', '=', $user_id)
               ->where('delivery_status', '=', 5)
               ->orderBy('date_created', 'DESC')
               ->get();

  $cancelled = DB::table('qoute_details')
               ->select(DB::raw('*'))
               ->where('cust_login_id', '=', $user_id)
               ->where('payment_status', '=', 999)
               ->orderBy('date_created', 'DESC')
               ->get();
  $inroute = DB::table('qoute_details')
               ->select(DB::raw('*'))
               ->where('cust_login_id', '=', $user_id)
               ->where('delivery_status', '=', 3)
               ->orWhere('delivery_status', '=', 4)
               ->orderBy('date_created', 'DESC')
               ->get();
 $all_trans = DB::table('qoute_details')
              ->select(DB::raw('*'))
              ->where('cust_login_id', '=', $user_id)
              ->orderBy('date_created', 'DESC')
              ->get();
  $invoices = DB::table('invoices')
               ->select(DB::raw('*'))
               ->where('customer_id', '=', $user_id)
               ->orderBy('date_created', 'DESC')
               ->get();

  $service_provicer = array();
  if (!empty($details->serviceProviderID)) {
    $service_provicer = DB::table('service_providers')
                       ->select(DB::raw('*'))
                       ->where('serviceProviderID', '=', $details->serviceProviderID)
                       ->first();
  }

  $total_transactions = 0;
  $total_cancelled = 0;
  $total_payments = 0;
  foreach ($invoices as $invoice) {
    $total_payments = $total_payments + $invoice->invoice_amount;
  }

  foreach ($all_trans as $tran) {
    $total_transactions = $total_transactions + $tran->final_price;
  }
  foreach ($cancelled as $cancel_tran) {
    $total_cancelled = $total_cancelled + $cancel_tran->final_price;
  }

  $outstanding_payments = $total_transactions - $total_cancelled - $total_payments;



  $user_details = array(
                'details'           => $details,
                'service_provicer'  => $service_provicer,
                'transactions'         => $all_trans,
                'invoices'          => $invoices,
                'total_transactions_amt'  => round($total_transactions, 2),
                'total_payments'          => round($total_payments, 2),
                'total_cancelled'          => round($total_cancelled, 2),
                'outstanding_payments'    => round($outstanding_payments, 2),
            );

   if (empty($user_details)) {
     return response()->json(['status' => 'error', 'msg' => "No results found."]);
   }else {
     return response()->json($user_details);
   }
}



  /******************
  // List all drivers
  ******************/
   public function list_all_users(Request $request){
       $users = Customers::orderBy('date_created', 'DESC')->get();
       return response()->json($users);
   }



   // Update user details
   public function update_password(Request $request, $user_id){

     $this->validate($request, [
         'new_password' => 'required',
         'cur_pass' => 'required'
      ]);

     $user = Customers::where('user_id', $user_id)->first();

     if(Hash::check($request->input('cur_pass'), $user->password)){

       $new_password = Hash::make($request->new_password);

       $update_pass = Customers::where('user_id', $user_id)->update(array('password' => $new_password));

       if (empty($request->new_password)) {
           return response()->json(['status' => 'error', 'msg' => "Password Empty."]);
       }else{
         if ($update_pass) {
             return response()->json(['status' => 'success', 'msg' => "Password Updated."]);
         }else{
             return response()->json(['status' => 'error', 'msg' => "Something went wrong updating the Password"]);
         }
       }

      }else{
        return response()->json(['status' => 'error', 'msg' => "Incorrect password."]);
      }

   }


   /******************
   UPDATE PROFILE
   ******************/
   public function update_profile(Request $request, $user_id){

     $this->validate($request, [
         'phone_no' => 'required'
      ]);


       $update_profile = Customers::where('user_id', $user_id)->update(array('phone_no' => $request->phone_no));

       if (empty($request->phone_no)) {
           return response()->json(['status' => 'error', 'msg' => "Password Empty."]);
       }else{

         if ($update_profile) {
             return response()->json(['status' => 'success', 'msg' => "Profile Updated."]);
         }else{
             return response()->json(['status' => 'error', 'msg' => "Something went wrong updating the Password"]);
         }

       }

   }


   /******************
   UPDATE BILLING
   ******************/
   public function update_billing(Request $request, $user_id){

     $this->validate($request, [
         'billing_type' => 'required'
      ]);

       $update_billing = Customers::where('user_id', $user_id)->update(array('billing_type' => $request->billing_type));
       if (empty($request->billing_type)) {
           return response()->json(['status' => 'error', 'msg' => "Billing type empty."]);
       }else{

         if ($update_billing) {
             return response()->json(['status' => 'success', 'msg' => "Customer billing updated."]);
         }else{
             return response()->json(['status' => 'error', 'msg' => "Something went wrong updating the billing type"]);
         }

       }

   }


   /******************
   GET USER BILLING
   ******************/
   public function get_user_billing(Request $request, $user_id){


     $get_quotes = DB::table('qoute_details')
                  ->select(DB::raw('*'))
                  ->where('cust_login_id', '=', $user_id)
                  ->orderBy('date_created', 'DESC')
                  ->get();


        $billing_data = array();
        $company_list = array();
        foreach ($get_quotes as $quote) {

          if ( !in_array($quote->serviceProviderID, $company_list) ) {

            $get_providers = DB::table('service_providers')
                         ->select(DB::raw('*'))
                         ->where('serviceProviderID', '=', $quote->serviceProviderID)
                         ->first();

            $company_quotes = DB::table('qoute_details')
                                     ->select(DB::raw('*'))
                                     ->where('cust_login_id', '=', $user_id)
                                     ->where('serviceProviderID', '=', $quote->serviceProviderID)
                                     ->orderBy('date_created', 'DESC')
                                     ->get();
           $invoices = DB::table('invoices')
                        ->select(DB::raw('*'))
                        ->where('customer_id', '=', $user_id)
                        ->where('serviceProviderID', '=', $quote->serviceProviderID)
                        ->orderBy('date_created', 'DESC')
                        ->get();

             $total_transactions = 0;
             $total_cancelled = 0;
             $total_payments = 0;
             foreach ($invoices as $invoice) {
               $total_payments = $total_payments + $invoice->invoice_amount;
             }

             foreach ($company_quotes as $tran) {
               $total_transactions = $total_transactions + $tran->final_price;
               if ($tran->delivery_status == "999" || $tran->delivery_status == "cancelled") {
                 $total_cancelled = $total_cancelled + $tran->final_price;
               }
             }

             $outstanding_payments = $total_transactions - $total_cancelled - $total_payments;

            $arr_data = array(
                          'company_data'    => $get_providers,
                          'waybills'        => $company_quotes,
                          'invoices'          => $invoices,
                          'total_transactions_amt'  => round($total_transactions, 2),
                          'total_payments'          => round($total_payments, 2),
                          'total_cancelled'          => round($total_cancelled, 2),
                          'outstanding_payments'    => round($outstanding_payments, 2),
                      );

            array_push($billing_data, $arr_data );

            array_push($company_list, $quote->serviceProviderID);

          }

        }


      return response()->json($billing_data);

   }






}
