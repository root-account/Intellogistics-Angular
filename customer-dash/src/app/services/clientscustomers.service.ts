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


  constructor(private _http: HttpClient) {} 

  // Get all customers
  getCustomersData(user_id): Observable<any []> { 
    let customers_data = this._http.get<Customers []>(this.get_customer_url+"/"+user_id);
    return customers_data;
  }

  // Get single customers
  // getSingleDriver(user_id): Observable<any []> { 
  //   let customer_data = this._http.get<any []>(this.single_customer_url+user_id);
  //   return customer_data;
  // }



  
  
}
