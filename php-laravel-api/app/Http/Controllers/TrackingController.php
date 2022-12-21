<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Tracking;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Auth;

class TrackingController extends Controller
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


    // Create new driver
    public function insertTrackingData(Request $request){

        $Tracking = new Tracking;

        $Tracking->waybill_no = $request->waybill_no;
        $Tracking->status = $request->status;
        $Tracking->driver_note = $request->driver_note;
        $Tracking->branch_note = $request->branch_note;
        $Tracking->start_location = $request->start_location;
        $Tracking->dest_location = $request->dest_location;
        $Tracking->driver_id = $request->driver_id;
        $Tracking->driver_name = $request->driver_name;
        $Tracking->driver_cell = $request->driver_cell;
        $Tracking->driver_alt_cell = $request->driver_alt_cell;

        $Trackinginput = $request->all();


        if (empty($Tracking->waybill_no)) {
            return "empty";
        }

        if ($Tracking->save($Trackinginput)) {
            return "success";
        }else{
            return "Something went wrong, Please try again";
        }

    }


    // List all Qoutes
    public function get_tracking(Request $request){

        $Tracking = Tracking::orderBy('date_created', 'ASC')->get();

        return response()->json($Tracking);

    }

    // Get drivers waybill_status



    // List all Qoutes
    public function get_driver_tracks(Request $request, $driver_id){

        $Tracking = Tracking::orderBy('date_created', 'DESC')
                              ->where('driver_id', '=', $driver_id)
                              ->where('status', '!=', 1)
                              ->get();

        return response()->json($Tracking);

    }

    // Grouped tracking
    public function get_grouped_tracks(Request $request, $waybill_no){
      $tracking_data = DB::table('package_tracking')
                         ->select(DB::raw('*'))
                         ->where('waybill_no', '=', $waybill_no)
                         ->orderBy('date_created', 'ASC')
                         ->get();
     $qoute_data = DB::table('qoute_details')
                      ->select(DB::raw('*'))
                      ->where('qoute_id', '=', $waybill_no)
                      ->first();
    $package_data = DB::table('packages')
                       ->select(DB::raw('*'))
                       ->where('waybill', '=', $waybill_no)
                       ->orderBy('date_created', 'DESC')
                       ->get();


                  $track_info = array(
                                'qoute_user' => $qoute_data,
                                'packages'   => $package_data,
                                'tracking'   => $tracking_data,
                            );

      return response()->json($track_info);
    }


}
