<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\ServiceProviders;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Auth;

class ServiceProvidersController extends Controller
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


    /*********************
    GET SERVICE PROVIDER
    **********************/
    public function get_service_provider(Request $request){
      $serviceProviderId = $request->serviceProviderId;

      $empty = array();
      if ( !empty($serviceProviderId) ) {

        // fetch rates from the DB by service ID
        $get_provider = DB::table("service_providers")
                           ->select(DB::raw('*'))
                           ->where("serviceProviderID", "=", $serviceProviderId)
                           ->first();
        if ($get_provider) {
          return response()->json($get_provider);
        }else{
          return response()->json($get_provider);
        }

      }else{
        return response()->json($empty);
      }

    }




}
