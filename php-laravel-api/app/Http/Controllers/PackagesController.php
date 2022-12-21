<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\Packages;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use App\Mail\MyEmail;

use Auth;

class PackagesController extends Controller
{

     public function __construct()
    {
        $this->middleware('auth', ['except' => ['insertPackage']]);
    }

    // Get all Packages and their items and groups
    public function PackageData(Request $request){


    }

    // Test email
    public function sendEmail(Request $request) {

        $Package = new Packages;

        Mail::to('mekgwele@gmail.com')->send(new MyEmail($Package));

        return "Something";
    }


    // List all Packages
    public function listPackages(Request $request){
        $packages = Packages::all();

        return response()->json($packages);

    }



    // Delete a Package
    public function deletePackage($id, Request $request){
        $Package = Packages::where('id', $id)->delete();

        if ($Package) {
            return "Package delete";
        }else{
            return "Something went wrong, Please try again";
        }
    }

    // Create new Package
    public function insertPackage(Request $request){

        $Package = new Packages;

        // $dimensions = json_decode($request->package_dimensions, true);

        $dimensions = json_decode($request->packages, true);

        print_r($dimensions);
        $msg = "";
        $i = count($dimensions);
        $array = array();

        echo $i;
        for ($x = 0; $x < $i; $x++) {

            $array[] = array(
            'parent_id' => $request->qoute_id,
            'waybill' => $request->qoute_id,
            // 'package_type' => $request->package_type,
            'package_desc' =>$dimensions[$x]['pack_desc'],
            'length' => $dimensions[$x]['pack_length'],
            'height' => $dimensions[$x]['pack_height'],
            'width' => $dimensions[$x]['pack_width'],
            'weight' => $dimensions[$x]['pack_weight'],
            'date_created' => date('Y-m-d H:i:s'),
            'date_modified' => date('Y-m-d H:i:s')
            );

        }

        if (DB::table('packages')->insert($array)) {
                return "Successfully saved ";
        }else{
            return "Something Went wrong";
        }


    }

    // Update existing Package
    public function updatePackage($id, Request $request){

        $Package = Packages::where('id', $id)->update(array('title' => $request->title));


        if (empty($request->title)) {
            return "Please fill in the title";
        }

        if ($Package) {
            return "Package Updated";
        }else{
            return "Something went wrong, Please try again";
        }

    }


}
