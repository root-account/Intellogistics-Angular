import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customers } from '../models/customers';

@Injectable({
  providedIn: 'root'
})
export class ClientscustomersService {

  
  private BaseURL = "https://intellogistics.pharrage.co.za/api/public";

  private get_customer_url: string = this.BaseURL+"/getuserdata"; 
  private get_customer_bill_url: string = this.BaseURL+"/get-user-billing"; 
  private login_url : string = this.BaseURL+"/login-customer";
  private rgister_url : string = this.BaseURL+"/register-customer";

  constructor(private _http: HttpClient) {} 

  // Get all customers
  getCustomersData(user_id): Observable<any []> { 
    let customers_data = this._http.get<Customers []>(this.get_customer_url+"/"+user_id);
    return customers_data;
  }

  // Get all customers billing data
  getCustomersBilling(user_id): Observable<any []> { 
    let customers_bill = this._http.get<Customers []>(this.get_customer_bill_url+"/"+user_id);
    return customers_bill;
  }

  // Login customer
  loginCustomer(username, user_pass){
  
    let params = new HttpParams();
    let headers = new HttpHeaders();

    params = params.append( "username", username);
    params = params.append( "password", user_pass);

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', '');

    return this._http.post(this.login_url,params,{headers, params});
     
  }


  // Register customer
  createCustomer(formData){
  
    let params = new HttpParams();
    let headers = new HttpHeaders();

    params = params.append( "username", formData.username);
    params = params.append( "password", formData.user_pass);

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', '');

    return this._http.post(this.rgister_url,params,{headers, params});
     
  }


  
  
}
