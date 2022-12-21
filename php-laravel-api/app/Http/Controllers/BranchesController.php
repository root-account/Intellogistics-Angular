<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Branches;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Auth;

class BranchesController extends Controller
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
    public function insertBranchesData(Request $request){

        $Branches = new Branches;

        $Branches->waybill_no = $request->waybill_no;
        $Branches->status = $request->status;
        $Branches->driver_note = $request->driver_note;
        $Branches->branch_note = $request->branch_note;
        $Branches->start_location = $request->start_location;
        $Branches->dest_location = $request->dest_location;
        $Branches->driver_id = $request->driver_id;
        $Branches->driver_name = $request->driver_name;
        $Branches->driver_cell = $request->driver_cell;
        $Branches->driver_alt_cell = $request->driver_alt_cell;

        $Branchesinput = $request->all();


        if (empty($Branches->waybill_no)) {
            return "empty";
        }

        if ($Branches->save($Branchesinput)) {
            return "success";
        }else{
            return "Something went wrong, Please try again";
        }

    }


    // Grouped branches
    public function get_all_branches(Request $request){

      $branches_data = DB::table('branches')
                         ->select(DB::raw('*'))
                         ->orderBy('date_created', 'ASC')
                         ->get();

      return response()->json($branches_data);
    }


}
