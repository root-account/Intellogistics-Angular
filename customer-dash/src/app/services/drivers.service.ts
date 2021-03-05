import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Drivers } from '../models/drivers';


@Injectable({
  providedIn: 'root'
})
export class DriversService {

  private BaseURL = "https://intellogistics.pharrage.co.za/api/public";

  private drivers_url: string = this.BaseURL+"/get_drivers"; 
  private single_driver_url: string = this.BaseURL+"/single-driver/"; 
  // private get_rates_url = this.BaseURL+"/get-rates";
  // private get_pricing_url = this.BaseURL+"/calculate-rate/";
  // private post_waybill_url = this.BaseURL+"/newqoute";
  // private update_waybill_url = this.BaseURL+"/updateqoute/";

  constructor(private _http: HttpClient) {} 

  // Get all waybills
  getAllDrivers(): Observable<any []> { 
    let drivers_data = this._http.get<Drivers []>(this.drivers_url);
    return drivers_data;
  }

  // Get single waybill
  getSingleDriver(driver_id): Observable<any []> { 
    let drivers_data = this._http.get<any []>(this.single_driver_url+driver_id);
    return drivers_data;
  }

  // Get rates
  // getRatesServ(fromRegion, toRegion): Observable<any []> { 
  //   let params = new HttpParams();
  //   let headers = new HttpHeaders();
  //   params = params.append('collection_branch', fromRegion);
  //   params = params.append('destination_branch', toRegion);
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('data', 'application/json');

  //   let rates_data = this._http.get<any[]>(this.get_rates_url, {headers, params} );
  //   return rates_data;
  // }

  // Get Calculations
  // getCalculatedRatesServ(formData): Observable<any []>{
  //   let service_id = formData.service_type;
  //   let params = new HttpParams();
  //   let headers = new HttpHeaders();
  //   params = params.append('service_id', service_id);
  //   params = params.append('package_weight', formData.admin_weight);
  //   params = params.append('package_length', formData.admin_length);
  //   params = params.append('package_height', formData.admin_height);
  //   params = params.append('package_width', formData.admin_width);
  //   params = params.append('collection_branch', formData.collection_branch);
  //   params = params.append('destination_branch', formData.destination_branch);
  //   params = params.append('collection_address', formData.collection_branch);
  //   params = params.append('destination_address', formData.destination_branch);

  //   headers.append('Content-Type', 'application/json');
  //   headers.append('Authorization', '');
  
  //   console.log(formData);
    
  //   let calculated_rates_data = this._http.get<any[]>(this.get_pricing_url+service_id, {headers, params} );

  //   console.log(calculated_rates_data);
    
  //   return calculated_rates_data;
  // }

    // Create New waybill
    // postWaybill(formData){
    //   var randomNumber = Math.floor((Math.random() * 999999) + 10000);
    //   var randomLetters = " ";
    //   var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //   for( var i=0; i < 2; i++ )
    //       randomLetters += charset.charAt(Math.floor(Math.random() * charset.length));

    //   var waybill_no = randomLetters+"-"+randomNumber;
    //   var waybill_no = waybill_no.replace(/\s/g,'');

    //   let params = new HttpParams();
    //   let headers = new HttpHeaders();

    //   params = params.append( "qoute_id", waybill_no);
    //   params = params.append("cust_name", formData.cust_name);
    //   params = params.append("surname", formData.surname);
    //   params = params.append("cellphone", formData.cellphone);
    //   params = params.append( "email_addr", formData.email_addr);
    //   params = params.append("company_name", "");
    //   params = params.append( 'receiver_name', formData.receiver_name);
    //   params = params.append( 'receiver_phone', formData.receiver_phone);
    //   params = params.append( 'receiver_email', formData.receiver_email);
    //   params = params.append( 'receiver_company', formData.receiver_company);
    //   params = params.append("destination_address", formData.destination_address);
    //   params = params.append("pickup_address", formData.pickup_address);
    //   params = params.append("destination_branch",formData.destination_branch);
    //   params = params.append("collection_branch",formData.collection_branch);
    //   params = params.append("pickup_postal_code","");
    //   params = params.append("service_type", formData.service_type);
    //   params = params.append("receival_method", "");
    //   params = params.append("final_price", formData.final_price);
    //   params = params.append("vat_price", formData.vat_price);
    //   params = params.append("mincharge_price", formData.mincharge_price);
    //   params = params.append("per_kg_price", formData.per_kg_price);
    //   params = params.append("fuel_price", formData.fuel_price)
    //   params = params.append( "branch",formData.branch);
    //   params = params.append("status", '00');
    //   params = params.append( "delivery_status", "pickup");
    //   params = params.append("payment_status", "pending");
    //   params = params.append("cust_login_id", "");
    //   params = params.append("special_note", formData.special_note);
    //   params = params.append( "modified_by", "");
    //   params = params.append( "admin_weight", formData.admin_weight);
    //   params = params.append( "admin_length", formData.admin_length);
    //   params = params.append("admin_height", formData.admin_height);
    //   params = params.append("admin_width", formData.admin_width);

    //   headers.append('Content-Type', 'application/json');
    //   headers.append('Authorization', '');

    //   return this._http.post(this.post_waybill_url,params,{headers, params});
       
    // }


    // Update waybill
    // updateWaybill(waybill_no, formData){
    //   let params = new HttpParams();
    //   let headers = new HttpHeaders();

    //   params = params.append("delivery_status", formData.delivery_status);
    //   params = params.append("payment_status", formData.payment_status);
    //   params = params.append("delivery_note", formData.delivery_note);
    //   params = params.append("driver_id", formData.driver_id);
    //   params = params.append("branch", formData.branch);
    //   params = params.append("signed_on", formData.signed_on);
    //   params = params.append("signed_by", formData.signed_by);
    //   params = params.append( "modified_by", "");

    //   headers.append('Content-Type', 'application/json');
    //   headers.append('Authorization', '');


    //   return this._http.put(this.update_waybill_url+waybill_no ,params,{headers, params});
       
    // }


}
