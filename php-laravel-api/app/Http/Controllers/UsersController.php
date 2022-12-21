<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Users;


class UsersController extends Controller
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

    //******************
    // LOGIN
    /******************/
   public function authenticate(Request $request)
   {
       $this->validate($request, [
           'username' => 'required',
           'password' => 'required'
        ]);

      $user = Users::where('username', $request->input('username'))->first();

     if($user != "" && Hash::check($request->input('password'), $user->password)){
      // if($user != "" && $request->input('password') == $user->password){

          $apikey = base64_encode(str_random(40));

          Users::where('username', $request->input('username'))->update(['api_key' => $apikey]);

          $login_status = ['status' => 'success','api_key' => $apikey, 'user' => $request->input('username')];

          return response()->json($login_status);

      }else{
        return response()->json(['status' => 'error', 'msg' => "Incorrect Username or password."]);
      }

   }


   //******************
   // ADD NEW ADMIN
   /******************/
   public function register_admin(Request $request)
   {
     $this->validate($request, [
         'username' => 'required',
         'password' => 'required'
      ]);

        $User = new Users;

        $user_password = Hash::make($request->password);

        $User->admin_id = $request->admin_id;
        $User->admin_names = $request->admin_names;
        $User->admin_cell = $request->admin_cell;
        $User->username = $request->username;
        $User->password = $user_password;

        $check_user = Users::where('username', $request->username)->first();

        if(empty($check_user)){
          $user_input = $request->all();
          if ($User->save($user_input)) {
              return response()->json(['status' => 'success','msg' => 'Admin created.']);
          }else{
              return response()->json(['status' => 'error','msg' => 'Something went wrong while creating this User. Contact support']);
          }
        }else{
          return response()->json(['status' => 'error','msg' => 'The email '.$request->username.' is already in use by another admin. Try a different one.']);
        }



   }



}
