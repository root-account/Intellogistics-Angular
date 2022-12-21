<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Invoices;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Auth;

class InvoicesController extends Controller
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
    public function insertInvoicesData(Request $request){

        $Invoices = new Invoices;

        $Invoices->waybill_no = $request->waybill_no;
        $Invoices->invoice_no = $request->invoice_no;
        $Invoices->customer_id = $request->customer_id;
        $Invoices->invoice_amount = $request->invoice_amount;

        $Invoicesinput = $request->all();

        if ($Invoices->save($Invoicesinput)) {
            return "success";
        }else{
            return "Something went wrong, Please try again";
        }

    }

    // Grouped invoices
    public function get_customer_invoices(Request $request, $customer_id){

      $invoices_data = DB::table('invoices')
                         ->select(DB::raw('*'))
                         ->where("customer_id", "=", $customer_id)
                         ->orWhere("user_email", "=", $customer_id)
                         ->first();

      return response()->json($invoices_data);
    }


    // Grouped invoices
    public function get_all_invoices(Request $request){

      $invoices_data = DB::table('invoices')
                         ->select(DB::raw('*'))
                         ->orderBy('date_created', 'ASC')
                         ->get();

      return response()->json($invoices_data);
    }


    public function delete_invoice($waybill_no, Request $request){
        $Qoute = Invoices::where('waybill_no', $waybill_no)->delete();

        if ($Qoute) {
            return "Invoice deleted";
        }else{
            return "Something went wrong deleting this quote.";
        }
    }


}
