import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import * as moment from 'moment';

// Services
import {ClientscustomersService} from '../../services/clientscustomers.service';

@Component({
  selector: 'app-branches',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  public loggedInId= localStorage.getItem('userID');
  public loading_msg = "";
  public billing_data = [];
  public total_outstanding = 0;
  public total_payments = 0;

  constructor(
    private _customerService: ClientscustomersService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    this.getCustomersBilling();

  }


  // get single waybill
  getCustomersBilling():void{
    this.loading_msg = "Loading bill information....";
    this.spinner.show();
    this._customerService.getCustomersBilling(this.loggedInId).subscribe({
      next: data => {

        this.billing_data = data;

        console.log(this.billing_data);
        


        data.forEach(value => {
          this.total_outstanding = this.total_outstanding + value.outstanding_payments;
          this.total_payments = this.total_payments + value.total_payments;
        });


        this.spinner.hide();
        this.loading_msg = "";

      },error: error => {
        this.spinner.hide();
        this.loading_msg = "";
        console.log(error);
        this.toastr.error('There was a technical error fetching waybill data. [er-getSW]', '', {
          positionClass: 'toast-top-center',
          timeOut: 3000,
          // closeButton: true,
          // disableTimeOut: true,
        });
        
      }
    });
  }



}
