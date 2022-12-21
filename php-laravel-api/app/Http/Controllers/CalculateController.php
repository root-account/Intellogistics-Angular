<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Calculate;


class CalculateController extends Controller
{



	public function calculateRate(Request $request){

		$user_inputs = array("weight" 	=> $request->weight,
						  	 "pickup_dist"		  => $request->pickup_dist,
						  	 "delivery_dist" 	  => $request->delivery_dist,
						  	 "receival_method" 	=> $request->receival_method,
							);

		$auth = new Calculate();

		$all_amounts = array( 'economy' => $auth->calculate_economy($user_inputs),
							  'overnight' => $auth->calculate_overnight($user_inputs),
							);

        return $all_amounts;

    }



}
