<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Calculate extends Model
{

	function calculation_fomula($rates, $user_inputs){

		// A variable to hold the distance amount
		$pickup_cost;
		$delivery_cost;
		$final_calculated_cost;

		// Distance inputed by user
		$pickup_distance = $user_inputs["pickup_dist"];
		$delivery_distance = $user_inputs["delivery_dist"];
		$vat = 0.15;

		// Check for pickup distance
		if ($pickup_distance <= 10) {
			$pickup_cost = $rates["main_amount"];
		}else if($pickup_distance > 10 && $pickup_distance <= 30){
			$pickup_cost = $rates["major_amount"];
		}else if($pickup_distance > 31 && $pickup_distance <= 100){
			$pickup_cost = $rates["intra_regional_amount"];
		}else if($pickup_distance > 100){
			$pickup_cost = $rates["regional_amount"];
		}


		// Check for delivery
		if ($delivery_distance <= 10) {
			$delivery_cost = $rates["main_amount"];
		}else if($delivery_distance > 10 && $delivery_distance <= 30){
			$delivery_cost = $rates["major_amount"];
		}else if($delivery_distance > 31 && $delivery_distance <= 100){
			$delivery_cost = $rates["intra_regional_amount"];
		}else if($delivery_distance > 100){
			$delivery_cost = $rates["regional_amount"];
		}

		// Package cost
		if ($user_inputs["weight"] > $rates["pack_free_weight"]) {
			$package_cost = ($user_inputs["weight"] - $rates["pack_free_weight"]) * $rates["kg_after"];
		}else if ($user_inputs["weight"] <= $rates["pack_free_weight"] && $user_inputs["weight"] > 0) {
			$package_cost = 0;
		}

		if ($user_inputs["receival_method"] == "dropoff") {
			$pickup_cost = 0;
		}

		$pickup_cost = 0;

		// $cost_before_tax = $pickup_cost + $delivery_cost + $package_cost;
		// $tax = $cost_before_tax * $vat;

		$cost_before_tax = $delivery_cost + $package_cost;
		$tax = $cost_before_tax * $vat;


		$fuel_surcharge = ($cost_before_tax + $tax) * $rates["fuel_charge"];

		if ($user_inputs["receival_method"] == "dropoff") {
			$fuel_surcharge = 0;
		}

		$final_calculated_cost = $cost_before_tax + $fuel_surcharge + $tax;
		// $final_calculated_cost = cost_before_tax + tax;

		$cost_breakdown = array(
			  "pickup_cost"		=> $pickup_cost,
			  "delivery_cost"	=> $delivery_cost,
			  "pack_cost"		=> $package_cost,
			  "tax_amt"			=> $tax,
			  "fuel_amt"		=> $fuel_surcharge,
			  "final_amt"		=> round($final_calculated_cost, 2),
		);

		return $cost_breakdown;

	}


	function calculate_overnight($user_inputs){

		$rates = array(	  "main_amount" 		=> 95,
						  "major_amount"		=> 115,
						  "intra_regional_amount" => 125,
						  "regional_amount" 	=> 190,
						  "kg_after" 			=> 35,
						  "pack_free_weight" 	=> 2,
						  "fuel_charge" 		=>0.3
					);


		return $this->calculation_fomula($rates, $user_inputs);
	}

	function calculate_economy($user_inputs){

		$rates = array(
			  "main_amount"			=>  105,
			  "major_amount" 		=> 135,
			  "intra_regional_amount"	=>  138,
			  "regional_amount"		=>  170,
			  "kg_after"			=> 	8.5,
			  "pack_free_weight"	=>  10,
			  "fuel_charge"			=>  0.3,
		);

		return $this->calculation_fomula($rates, $user_inputs);

	}
}
