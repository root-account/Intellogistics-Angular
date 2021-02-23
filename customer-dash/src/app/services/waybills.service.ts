import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 
import { catchError, tap, map } from 'rxjs/operators'; 
import { IWaybill } from '../models/waybills'; 

  
@Injectable({ 
  providedIn: 'root'
}) 
export class WaybillService { 

  private BaseURL = "https://intellogistics.co.za/app/api/public";

  private waybills_url: string = this.BaseURL+"/qoutes"; 
  private single_waybill_url: string = this.BaseURL+"/single-qoute/"; 
  private get_rates_url = this.BaseURL+"/get-rates";
  private get_pricing_url = this.BaseURL+"/calculate-rate/";
  private get_all_pricing_url = this.BaseURL+"/calculate-all-rates/";
  private get_all_services_url = this.BaseURL+"/get-services";
  private get_provider_services_url = this.BaseURL+"/supplier-services";
  private post_waybill_url = this.BaseURL+"/newqoute";
  private update_waybill_url = this.BaseURL+"/updateqoute/";
  private get_service_provider_url = this.BaseURL+"/service-provider";
  private get_single_user_url = this.BaseURL+"/getuserdata/";
  private track_waybill_url = this.BaseURL+"/track-waybill/";

  constructor(private _http: HttpClient) {} 

  // Get all waybills
  getAllWaybills(): Observable<any []> { 
    let waybils_data = this._http.get<IWaybill []>(this.waybills_url);

    return waybils_data;
  }

  // Get single waybill
  getSingleWaybillServ(waybill_no): Observable<any []> { 
    let waybil_data = this._http.get<any []>(this.single_waybill_url+waybill_no);
    return waybil_data;
  }


  // Track Waybill
  TrackWaybill(waybill_no): Observable<any []> { 
    let waybil_data = this._http.get<any []>(this.track_waybill_url+waybill_no);
    return waybil_data;
  }


  // Get Calculations
  // Get Calculations from all companies
  get_single_quote(formData, totalDimensions): Observable<any []>{
    let service_id = formData.service_type;
    let params = new HttpParams();
    let headers = new HttpHeaders();
    params = params.append('service_id', service_id);
    params = params.append('service_provider_id', formData.service_provider_id);
    params = params.append('package_weight', totalDimensions.total_weight);
    params = params.append('package_length', totalDimensions.total_length);
    params = params.append('package_height', totalDimensions.total_height);
    params = params.append('package_width', totalDimensions.total_width);
    params = params.append('collection_branch', formData.collection_branch);
    params = params.append('destination_branch', formData.destination_branch);

    

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', '');
    
    let all_quotes_data = this._http.get<any[]>(this.get_all_pricing_url+service_id, {headers, params} );
    
    return all_quotes_data;
  }



    // Get Calculations from all companies
    get_all_quotes(formData, totalDimensions): Observable<any []>{
      let service_id = formData.service_type;
      let params = new HttpParams();
      let headers = new HttpHeaders();
      params = params.append('service_id', service_id);
      params = params.append('package_weight', totalDimensions.total_weight);
      params = params.append('package_length', totalDimensions.total_length);
      params = params.append('package_height', totalDimensions.total_height);
      params = params.append('package_width', totalDimensions.total_width);
      params = params.append('collection_branch', formData.collection_branch);
      params = params.append('destination_branch', formData.destination_branch);
 
  
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', '');
      
      let all_quotes_data = this._http.get<any[]>(this.get_all_pricing_url+service_id, {headers, params} );
      
      return all_quotes_data;
    }

    // Get services 
    get_all_services(formData): Observable<any []>{
      let params = new HttpParams();
      let headers = new HttpHeaders();
      params = params.append('collection_branch', formData.collection_branch);
      params = params.append('destination_branch', formData.destination_branch);
  
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', '');
          
      let services_data = this._http.get<any[]>(this.get_all_services_url, {headers, params} );
  
      return services_data;
    }


    // Get services 
    get_provider_services(formData): Observable<any []>{
      let params = new HttpParams();
      let headers = new HttpHeaders();
      params = params.append('collection_branch', formData.collection_branch);
      params = params.append('destination_branch', formData.destination_branch);
      params = params.append('serviceProviderID', formData.service_provider_id);

      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', '');
          
      let services_data = this._http.get<any[]>(this.get_provider_services_url, {headers, params} );
  
      return services_data;
    }


    // Get Service provider
    get_service_provider(serviceProviderID): Observable<any []>{
      let params = new HttpParams();
      let headers = new HttpHeaders();
      params = params.append('serviceProviderID', serviceProviderID);
  
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', '');
          
      let service_provider = this._http.get<any[]>(this.get_service_provider_url, {headers, params} );
  
      return service_provider;
    }

    // Get single user
    get_single_user(user_id): Observable<any []>{
      let params = new HttpParams();
      let headers = new HttpHeaders();
  
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', '');
          
      let user_data = this._http.get<any[]>(this.get_single_user_url+user_id, {headers, params} );
  
      return user_data;
    }



    // Create New waybill
    postWaybill(formData, userDetailsFormData, totalDimensions, selected_courier){
      var randomNumber = Math.floor((Math.random() * 999999) + 10000);
      var randomLetters = " ";
      var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for( var i=0; i < 2; i++ )
          randomLetters += charset.charAt(Math.floor(Math.random() * charset.length));

      var waybill_no = randomLetters+"-"+randomNumber;
      var waybill_no = waybill_no.replace(/\s/g,'');

      let params = new HttpParams();
      let headers = new HttpHeaders();


      params = params.append( "qoute_id", waybill_no);
      params = params.append( "serviceProviderID", selected_courier['company_data'].serviceProviderID);
      params = params.append("cust_name", userDetailsFormData.cust_name);
      params = params.append("surname", userDetailsFormData.surname);
      params = params.append("cellphone", userDetailsFormData.cellphone);
      params = params.append( "email_addr", userDetailsFormData.email_addr);
      params = params.append("company_name", userDetailsFormData.company_name);
      params = params.append( 'receiver_name', userDetailsFormData.receiver_name);
      params = params.append( 'receiver_phone', userDetailsFormData.receiver_phone);
      params = params.append( 'receiver_email', userDetailsFormData.receiver_email);
      params = params.append( 'receiver_company', userDetailsFormData.receiver_company);
      params = params.append("destination_address", formData.destination_address);
      params = params.append("pickup_address", formData.pickup_address);
      params = params.append("destination_branch",formData.destination_branch);
      params = params.append("collection_branch",formData.collection_branch);
      params = params.append("pickup_postal_code","");
      params = params.append("service_type", selected_courier['rates'].service_type);
      params = params.append("receival_method", "");
      params = params.append("final_price", selected_courier['rates'].grand_total);
      params = params.append("vat_price", selected_courier['rates'].vat_amt);
      params = params.append("mincharge_price", selected_courier['rates'].min_cost);
      params = params.append("per_kg_price", selected_courier['rates'].per_kg_charge);
      params = params.append("fuel_price", selected_courier['rates'].fuel_cost)
      params = params.append( "branch",formData.branch);
      params = params.append("status", '00');
      params = params.append( "delivery_status", "pending");
      params = params.append("payment_status", "pending");
      params = params.append("cust_login_id", "");
      params = params.append("special_note", userDetailsFormData.special_note);
      params = params.append( "modified_by", "");
      params = params.append( "admin_weight", totalDimensions.total_weight);
      params = params.append( "admin_length", totalDimensions.total_length);
      params = params.append("admin_height", totalDimensions.total_height);
      params = params.append("admin_width", totalDimensions.total_width);
      params = params.append("packages", formData.packages);


      console.log(formData.packages);
      

      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', '');

      return this._http.post(this.post_waybill_url,params,{headers, params});
       
    }


    // Update waybill
    updateWaybill(waybill_no, formData){
      let params = new HttpParams();
      let headers = new HttpHeaders();

      params = params.append("delivery_status", formData.delivery_status);
      params = params.append("payment_status", formData.payment_status);
      params = params.append("delivery_note", formData.delivery_note);
      params = params.append("driver_id", formData.driver_id);
      params = params.append("branch", formData.branch);
      params = params.append("signed_on", formData.signed_on);
      params = params.append("signed_by", formData.signed_by);
      params = params.append( "modified_by", "");

      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', '');


      return this._http.put(this.update_waybill_url+waybill_no ,params,{headers, params});
       
    }


  
} 