<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Drivers;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Auth;

class DriversController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function authenticate(Request $request)
    {
        $this->validate($request, [
            'email_addr' => 'required',
            'password' => 'required'
         ]);

       $driver = Drivers::where('email_addr', $request->input('email_addr'))->first();

      if($driver != "" &&  Hash::check($request->input('password'), $driver->password)){
       // if($driver != "" && $request->input('password') == $driver->password){

           $apikey = base64_encode(str_random(40));

           Drivers::where('email_addr', $request->input('email_addr'))->update(['api_key' => $apikey]);

           $login_status = ['status' => 'success','api_key' => $apikey, 'user' => $request->input('email_addr')];

           return response()->json($driver);

       }else{
         return response()->json(['status' => 'error', 'msg' => "Incorrect username or password."]);
       }

    }

    // Create new driver
    public function register_driver(Request $request){

        $Driver = new Drivers;

        $this->validate($request, [
            'driver_id' => 'required',
            'licence_no' => 'required',
            'email_addr' => 'required',
            'full_names' => 'required'
         ]);

        $Driver->driver_id = $request->driver_id;
        $Driver->full_names = $request->full_names;
        $Driver->licence_no = $request->licence_no;
        $Driver->route = $request->driver_route;
        $Driver->email_addr = $request->email_addr;
        $Driver->phone_no = $request->phone_no;
        $Driver->alt_no = $request->alt_no;
        $Driver->driver_address = $request->driver_address;
        $Driver->driver_city = $request->driver_city;
        $Driver->driver_country = $request->driver_country;
        $Driver->postal_code = $request->postal_code;
        $Driver->vehicle_name = $request->veh_brand;
        $Driver->vehicle_model = $request->veh_model;
        $Driver->vehicle_year = $request->veh_year;
        $Driver->vehicle_plate = $request->reg_plate;


        $Driverinput = $request->all();

        $check_driver = Drivers::where('email_addr', $request->driver_email)->first();

        if(!empty($check_driver)){
           return response()->json(['status' => 'error','msg' => 'The email '.$request->driver_email.' is already registered.']);
        }else{
          if ($Driver->save($Driverinput)) {
              return response()->json(['status' => 'success', 'msg' => "Driver added."]);
          }else{
              return response()->json(['status' => 'error', 'msg' => "Something went wrong, Please try again."]);
          }
        }

    }


    // List all drivers
    public function get_drivers(Request $request){
        $Driver = Drivers::orderBy('date_created', 'DESC')->get();
        return response()->json($Driver);
    }

    // Get waybills of driver
    public function getDriverQuotes(Request $request, $driver_id){
        $driver_quotes = DB::table('qoute_details')
                 ->select(DB::raw('*'))
                 ->where('driver_id', '=', $driver_id)
                 ->orderBy('date_modified', 'ASC')
                 ->get();

        if (empty($driver_quotes)) {
          return response()->json(['status' => 'error', 'msg' => "No results found."]);
        }else {
          return response()->json($driver_quotes);
        }


    }


    public function get_driver_data(Request $request, $driver_id){

      $driver = Drivers::where('driver_id', $driver_id)->first();

      if (empty($driver)) {
        return response()->json(['status' => 'error', 'msg' => "No results found."]);
      }else{
        return response()->json($driver);
      }
    }


    // Get Driver Transactions
    public function getSingleDriver(Request $request, $driver_id){

        $details = DB::table('drivers')
                     ->select(DB::raw('*'))
                     ->where('driver_id', '=', $driver_id)
                     ->orderBy('date_created', 'DESC')
                     ->first();

        $in_transit = DB::table('qoute_details')
                     ->select(DB::raw('*'))
                     ->where('driver_id', '=', $driver_id)
                     ->where('delivery_status', '=', 3)
                     ->orderBy('date_modified', 'ASC')
                     ->get();

        $to_pickup = DB::table('qoute_details')
                     ->select(DB::raw('*'))
                     ->where('driver_id', '=', $driver_id)
                     ->where('delivery_status', '=', 2)
                     ->orderBy('date_modified', 'ASC')
                     ->get();

        $delivered = DB::table('qoute_details')
                     ->select(DB::raw('*'))
                     ->where('driver_id', '=', $driver_id)
                     ->where('delivery_status', '=', 5)
                     ->orderBy('date_modified', 'ASC')
                     ->get();


        $driver_details = array(
                      'details'       => $details,
                      'inroute'    => $in_transit,
                      'pickups'     => $to_pickup,
                      'delivered'     => $delivered,
                  );

        if (empty($driver_details)) {
          return response()->json(['status' => 'error', 'msg' => "No results found."]);
        }else {
          return response()->json($driver_details);
        }

    }

    // Create a login password for driver
    public function create_driver_pass(Request $request)
    {
      $this->validate($request, [
          'email_addr' => 'required',
          'password' => 'required',
          'licence_no' => 'required'
       ]);

         $Driver = new Drivers;

         $Driver_password = Hash::make($request->password);

         $Driver->licence_no = $request->licence_no;
         $Driver->email_addr = $request->email_addr;
         $Driver->password = $Driver_password;

         $check_driver = Drivers::where('email_addr', $request->email_addr)->first();

         if(empty($check_driver)){
            return response()->json(['status' => 'error','msg' => 'The email '.$request->username.' is not registered.']);
         }else{

           $Driver_input = $request->all();

           $update_pass = Drivers::where('email_addr', $request->email_addr)->update(array('password' => $Driver_password));

           if ($update_pass) {
               return response()->json(['status' => 'success','msg' => 'Password Created, You login using your email address.']);
           }else{
               return response()->json(['status' => 'error','msg' => 'Something went wrong while creating this Driver. Contact support']);
           }
         }

    }



    /********************
    DRIVER PROFILE
    *********************/
    // Update user details
    public function update_driver_password(Request $request, $driver_id){

      $this->validate($request, [
          'new_password' => 'required',
          'cur_pass' => 'required'
       ]);

      $driver = Drivers::where('driver_id', $driver_id)->first();

      if(Hash::check($request->input('cur_pass'), $driver->password)){

        $new_password = Hash::make($request->new_password);

        $update_pass = Drivers::where('driver_id', $driver_id)->update(array('password' => $new_password));

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



    public function update_driver_profile(Request $request, $driver_id){

      $this->validate($request, [
          'phone_no' => 'required'
       ]);

        $update_profile = Drivers::where('driver_id', $driver_id)->update(array('phone_no' => $request->phone_no));

        if (empty($request->phone_no)) {
            return response()->json(['status' => 'error', 'msg' => "Password Empty."]);
        }else{

          if ($update_profile) {
              return response()->json(['status' => 'success', 'msg' => "Profile Updated."]);
          }else{
              return response()->json(['status' => 'error', 'msg' => "Something went wrong updating the Profile"]);
          }

        }

    }




}
