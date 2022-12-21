<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Rates;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Auth;

class RatesController extends Controller
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


    //******************
    // Create new driver
    /******************/
    public function insertRatesData(Request $request){

        $Rates = new Rates;

        $Rates->waybill_no = $request->waybill_no;
        $Rates->status = $request->status;
        $Rates->driver_note = $request->driver_note;
        $Rates->branch_note = $request->branch_note;
        $Rates->start_location = $request->start_location;
        $Rates->dest_location = $request->dest_location;
        $Rates->driver_id = $request->driver_id;
        $Rates->driver_name = $request->driver_name;
        $Rates->driver_cell = $request->driver_cell;
        $Rates->driver_alt_cell = $request->driver_alt_cell;

        $Ratesinput = $request->all();


        if (empty($Rates->waybill_no)) {
            return "empty";
        }

        if ($Rates->save($Ratesinput)) {
            return "success";
        }else{
            return "Something went wrong, Please try again";
        }

    }

    //******************
    // Grouped rates
    /******************/
    public function get_all_rates(Request $request){

      $collection_branch = $request->collection_branch;
      $destination_branch =  $request->destination_branch;


      $rates_main = DB::table('rates_main')
                         ->select(DB::raw('*'))
                         ->orderBy('date_created', 'ASC')
                         ->get();
      $rates_local = DB::table('rates_local')
                          ->select(DB::raw('*'))
                          ->get();
      $rates_international = DB::table('rates_international')
                           ->select(DB::raw('*'))
                           ->orderBy('date_created', 'DESC')
                           ->get();
     $rates_additional = DB::table('rates_additional')
                          ->select(DB::raw('*'))
                          ->orderBy('date_created', 'DESC')
                          ->get();



      if ($collection_branch == $destination_branch) {
        $rates_data = array(
                      'region'          => "Local",
                      'rates'            => $rates_local,
                      'rates_additional' => $rates_additional,
                  );
      }elseif ($collection_branch !== $destination_branch) {
        $rates_data = array(
                      'region'          => "Main",
                      'rates'            => $rates_main,
                      'rates_additional' => $rates_additional,
                  );
      }

      if( empty($collection_branch) || empty($destination_branch) ){
        $rates_data = array(
                      'region'          => "All",
                      'rates_main'            => $rates_main,
                      'rates_local'           => $rates_local,
                      'rates_international'   => $rates_international,
                      'rates_additional'      => $rates_additional,
                  );
      }


      return response()->json($rates_data);
    }


    //******************
    // calculate rate
    /******************/
    public function calculate_rate(Request $request, $service_id){

      $package_weight = $request->total_weight;
      $package_length = $request->total_length;
      $package_height = $request->total_height;
      $package_width = $request->total_width;
      $collection_branch = $request->collection_branch;
      $destination_branch =  $request->destination_branch;
      $pickup_address = $request->pickup_addr;
      $destination_address = $request->destination_address;

      if ($collection_branch == $destination_branch) {
        $db_table = "rates_local";
        $service_region = "Local";
        $volumetric_unit = 4000;
      }else{
        $db_table = "rates_main";
        $service_region = "Main";
        $volumetric_unit = 5000;
      }

      if (!empty($request->service_provider_id)) {
        $main = DB::table($db_table)
                           ->select(DB::raw('*'))
                           ->where('id', "=" , $service_id)
                           ->where('serviceProviderID', "=" , $request->service_provider_id)
                           ->get();
      }else{
        $main = DB::table($db_table)
                           ->select(DB::raw('*'))
                           ->where('id', "=" , $service_id)
                           ->get();
      }

     $additional = DB::table('rates_additional')
                        ->select(DB::raw('*'))
                        ->get();
  print_r($main);

  if (!empty($main)) {


      $volumetric_weight = round( ($package_length*$package_height*$package_width)/$volumetric_unit, 2);

      if ($package_weight > $volumetric_weight) {
        $weight = $package_weight;
      }else{
        $weight = $volumetric_weight;
      }

      $freight_charge;
      $total_after_levies;
      $total_after_tax;
      $fuel_cost;
      $doc_cost =  7;
      $vat_perc =  0.15;
      $vat_amt = "";

      foreach($main as $rate) {
        $service_name = $rate->service_type;
        $service_desc = $rate->service_desc;
        $min_rate = $rate->min_rate;
        $max_kg = $rate->max_kg;
        $weight_after_max = $rate->weight_after_max;
        $rate_after_min = $rate->rate_after_min;
      }


      // Main Costs
      if ($weight <= $max_kg) {
        $freight_charge = $min_rate;
        $leftover_weight_cost = 0;
        $fuel_cost = $freight_charge * 0.29;
        $total_after_levies = $freight_charge + $fuel_cost;
        $vat_amt = $total_after_levies * $vat_perc;
        $total_after_tax = $total_after_levies + $vat_amt;
      }else{
        $leftover_weight = $weight - $max_kg;
        $leftover_weight_cost = ($leftover_weight / $weight_after_max) * $rate_after_min;
        $freight_charge = $min_rate + $leftover_weight_cost;
        $fuel_cost = $freight_charge * 0.29;
        $total_after_levies = $freight_charge + $fuel_cost + $doc_cost;

      }

      $vat_amt = $freight_charge * $vat_perc;
      $total_after_tax = $total_after_levies + $vat_amt;



        $rates_data = array(
                      'service_type'         => $service_name,
                      'service_desc'         => $service_desc,
                      'weight'               => $package_weight,
                      'volumetric_weight'    => $volumetric_weight,
                      'service_region'       => $service_region,
                      'min_cost'             => round($min_rate,2),
                      'per_kg_charge'        => round($leftover_weight_cost,2),
                      'freight_cost'         => round($freight_charge,2),
                      'fuel_cost'            => round($fuel_cost,2),
                      'doc_cost'             => round($doc_cost,2),
                      'sub_total'            => round($total_after_levies,2),
                      'vat_amt'              => round($vat_amt,2),
                      'grand_total'          => round($total_after_tax,2),
                  );

        $user_data = array(
                      'pickup_addr'         => $pickup_address,
                      'collection_branch'   => $collection_branch,
                      'destination_addr'    => $destination_address,
                      'destination_branch'  => $destination_branch,
                      'submited_weight'     => $package_weight,
                  );

        $request_res = array(
                              'rates'         => $rates_data,
                              'user_data'     => $user_data,
                            );


        return response()->json($request_res);
      }else{
        return response()->json(array());
      }

    }


    /*********************
    GET THE SERVICES
    **********************/
    public function get_services(Request $request){
      $collection_branch = $request->collection_branch;
      $destination_branch =  $request->destination_branch;


      $empty = array();
      if ( !empty($collection_branch) && !empty($destination_branch ) ) {

        if ($collection_branch == $destination_branch) {
          $db_table = "local";
          $service_region = "Local";
          $volumetric_unit = 4000;
        }else{
          $db_table = "main";
          $service_region = "Main";
          $volumetric_unit = 5000;
        }

        // fetch rates from the DB by service ID
        $get_services = DB::table("services_".$db_table)
                           ->select(DB::raw('*'))
                           ->get();

        return response()->json($get_services);
      }else{
        return response()->json($empty);
      }

    }

    /*********************
    GET THE SERVICES
    **********************/
    public function get_provider_services(Request $request){
      $collection_branch = $request->collection_branch;
      $destination_branch =  $request->destination_branch;
      $serviceProviderID =  $request->serviceProviderID;

      $empty = array();
      if ( !empty($collection_branch) && !empty($destination_branch ) ) {

        if ($collection_branch == $destination_branch) {
          $db_table = "local";
        }else{
          $db_table = "main";
        }

        // fetch rates from the DB by service ID
        $get_services = DB::table("rates_".$db_table)
                           ->select(DB::raw('*'))
                           ->where("serviceProviderID", "=", $serviceProviderID)
                           ->get();

        return response()->json($get_services);
      }else{
        return response()->json($empty);
      }

    }

    /*********************
    CALCULATE EACH RATES
    **********************/
    public function calculate_each_rate(Request $request, $service_id){

      $package_weight = $request->package_weight;
      $package_length = $request->package_length;
      $package_height = $request->package_height;
      $package_width = $request->package_width;
      $collection_branch = $request->collection_branch;
      $destination_branch =  $request->destination_branch;

      if ($collection_branch == $destination_branch) {
        $db_table = "local";
      }else{
        $db_table = "main";
      }

        // fetch rates from the DB by service ID
        if (!empty($request->service_provider_id)) {
          // fetch rates from the DB by service ID
        $get_rates = DB::table("rates_".$db_table)
                             ->select(DB::raw('*'))
                             ->where('service_id', "=" , $service_id)
                             ->where('serviceProviderID', "=" , $request->service_provider_id)
                             ->get();
        }else{
          $get_rates = DB::table("rates_".$db_table)
                               ->select(DB::raw('*'))
                               ->where('service_id', "=" , $service_id)
                               ->get();
        }

       $additional = DB::table('rates_additional')
                          ->select(DB::raw('*'))
                          // ->where('serviceProviderID', "=" , $service_provider)
                          ->get();



      $all_calculated_rates = array();
      // Check each rate rate was received
      if ($get_rates) {

      foreach ($get_rates as $rate) {

        // Get the details of the company
        $get_company = DB::table('service_providers')
                           ->select(DB::raw('*'))
                           ->where('serviceProviderID', "=" , $rate->serviceProviderID)
                           ->first();

        if ($get_company) {

          if (!empty($rate->volumetric_weight) && $rate->volumetric_weight !== 0) {
            $volumetric_unit = $rate->volumetric_weight;
            $volumetric_weight = round( ($package_length*$package_height*$package_width)/$volumetric_unit, 2);
          }else{
            $volumetric_unit = 0;
            $volumetric_weight = 0;
          }


          // Check if volumetric weight is greater than actual weigh
          if ($package_weight > $volumetric_weight) {
            $weight = $package_weight;
          }else{
            $weight = $volumetric_weight;
          }

          $freight_charge;
          $total_after_levies;
          $total_after_tax;
          $vat_amt = "";
          if (!empty($rate->vat) && $rate->vat !== 0) {
            $vat_perc = $rate->vat / 100;
          }else{
            $vat_perc = 0;
          }

          if (!empty($rate->fuel_levy) && $rate->fuel_levy !== 0 ) {
            $fuel_cost = ($rate->fuel_levy / 100);
          }else{
            $fuel_cost = 0;
          }

          $service_name = $rate->service_type;
          $service_desc = $rate->service_desc;
          $min_rate = $rate->min_rate;
          $max_kg = $rate->max_kg;
          $weight_after_max = $rate->weight_after_max;
          $rate_after_min = $rate->rate_after_min;


            // Main Costs
            if ($weight <= $max_kg) {
              $freight_charge = $min_rate;
              $leftover_weight_cost = 0;
              $fuel_cost = $freight_charge * $fuel_cost;
              $total_after_levies = $freight_charge + $fuel_cost;
              $vat_amt = $total_after_levies * $vat_perc;
              $total_after_tax = $total_after_levies + $vat_amt;
            }else{
              $leftover_weight = $weight - $max_kg;
              $leftover_weight_cost = ($leftover_weight / $weight_after_max) * $rate_after_min;
              $freight_charge = $min_rate + $leftover_weight_cost;
              $fuel_cost = $freight_charge * $fuel_cost;
              $total_after_levies = $freight_charge + $fuel_cost;

            }

            $vat_amt = $freight_charge * $vat_perc;
            $total_after_tax = $total_after_levies + $vat_amt;



            $rates_data = array(
                        'service_type'         => $service_name,
                        'service_desc'         => $service_desc,
                        'weight'               => $package_weight,
                        'volumetric_weight'    => $volumetric_weight,
                        'min_cost'             => round($min_rate,2),
                        'per_kg_charge'        => round($leftover_weight_cost,2),
                        'freight_cost'         => round($freight_charge,2),
                        'fuel_cost'            => round($fuel_cost,2),
                        'sub_total'            => round($total_after_levies,2),
                        'vat_amt'              => round($vat_amt,2),
                        'grand_total'          => round($total_after_tax,2),
                    );

            $company_data = array(
                          'company_name'        => $get_company->company_name,
                          'company_logo'        => $get_company->company_logo,
                          'email_address'       => $get_company->email_address,
                          'contact_no'          => $get_company->contact_no,
                      );

            $request_res = array(
                                'rates'         => $rates_data,
                                'company_data'  => $get_company,
                              );


          array_push($all_calculated_rates, $request_res);
        }

      }
      return response()->json($all_calculated_rates);
    }else{
      return response()->json($all_calculated_rates);
    }


  }//END FUNCTION




}
