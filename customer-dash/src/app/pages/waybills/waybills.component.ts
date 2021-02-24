import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import * as moment from 'moment';

import * as jQuery from 'jquery'; 

// const moment = require('moment');

// services
import {WaybillService} from '../../services/waybills.service';
import {ClientscustomersService} from '../../services/clientscustomers.service';

@Component({
  selector: 'app-waybills',
  templateUrl: './waybills.component.html',
  styleUrls: ['./waybills.component.css']
})
export class WaybillsComponent implements OnInit {

  @ViewChild('dataTable') table;
  dataTable: any;
  dtOption: any = {};

  public waybills$: Observable<WaybillService[]>;

  public loggedInId= "Technologies_1449";

  public single_waybill = [];
  public waybills = [];
  public user_data = [];
  public all = [];
  public today = [];
  public pending = [];
  public pickup = [];
  public cancelled = [];
  public at_branch = [];
  public delivered = [];
  public in_transit = [];

  public all_count = 0;
  public today_count = 0;
  public pending_count = 0;
  public pickup_count = 0;
  public cancelled_count = 0;
  public at_branch_count = 0;
  public delivered_count= 0;
  public in_transit_count = 0;

  public active_class = 'all';
  public loading_msg = "";
  public d_status_badge ="";
  public d_status_badge_table ="";

  public open_waybill = false;
  public transactions_found = false;

  trackinStatusForm : FormGroup;
  changeDriverForm : FormGroup;

  constructor(
              private _waybillService: WaybillService,
              private _customerService: ClientscustomersService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private fB: FormBuilder,
            ){ 
              
            }

  ngOnInit(): void {
    this.spinner.show();
    this.loading_msg = "Loading waybills...";


    this.dtOption = {
      "paging":   false,
      "ordering": false,
      "info":     false
  };
    
    this.getAllWaybills();

      // Check if there is internet connection
      this.createOnline$().subscribe((isOnline) =>{
        if(!isOnline){
          this.spinner.show();
          this.loading_msg = "Internet connection lost.... Trying to reconnect...";
        }else{
          this.spinner.hide();
          this.loading_msg = "";
        }

      });

    

  }

  applyFilter(filter_term):void{

    this.active_class = filter_term;

    if ( filter_term === 'all') {
      this.waybills = this.all;
    }
    if ( filter_term === 'today') {
      this.waybills = this.today;
    }
    if ( filter_term === 'pending') {
      this.waybills = this.pending;
    }
    if ( filter_term === 'pickup') {
      this.waybills = this.pickup;
    }
    if ( filter_term === 'at_branch') {
      this.waybills = this.at_branch;
    }
    if ( filter_term === 'in_transit') {
      this.waybills = this.in_transit;
    }
    if ( filter_term === 'delivered') {
      this.waybills = this.delivered;
    }
    if ( filter_term === 'cancelled') {
      this.waybills = this.cancelled;
    }

  }


  // Get all Waybills
  getAllWaybills(){
    this._customerService.getCustomersData(this.loggedInId).subscribe({
      next: data => {
        this.user_data = data;
        this.active_class = "all";
        this.all.length = 0;
        this.today.length = 0;
        this.pending.length = 0;
        this.pickup.length = 0;
        this.at_branch.length = 0;
        this.in_transit.length = 0;
        this.delivered.length = 0;
        this.cancelled.length = 0;

        console.log(data);
        

        if(data['transactions']){

          this.waybills = data['transactions'];

            data['transactions'].map((value, i) => {

            let waybill_date = moment(value['date_created']).format('YYYY-MM-DD');

            this.all.push(value);

            if ( moment(waybill_date).isSame(moment(), 'day') ) {
              this.today.push(value);
            }
            if ( value['payment_status'] === 'pending') {
              this.pending.push(value);
            }
            if ( value['delivery_status'] === 'pickup') {
              this.pickup.push(value);
            }
            if ( value['delivery_status'] === 'at_branch') {
              this.at_branch.push(value);
            }
            if ( value['delivery_status'] === 'in_transit') {
              this.in_transit.push(value);
            }
            if ( value['delivery_status'] === 'delivered') {
              this.delivered.push(value);
            }
            if ( value['delivery_status'] === 'cancelled') {
              this.cancelled.push(value);
            }

            this.all_count = this.all.length;
            this.pending_count = this.pending.length;
            this.pickup_count = this.pickup.length;
            this.at_branch_count = this.at_branch.length;
            this.in_transit_count = this.in_transit.length;
            this.delivered_count = this.delivered.length;
            this.cancelled_count = this.cancelled.length;
            this.today_count = this.today.length;

            this.statusBadgeClass(value['delivery_status'], value['payment_status'] )

          });

          if(this.waybills.length > 0){
            this.transactions_found = true;
          }else{
            this.transactions_found = false;
          }

        }

        this.spinner.hide();
        this.loading_msg = "";
      },error: error => {
        this.spinner.show();
        this.loading_msg = "There was a technical error fetching waybill data, if the problem persist please contact support.";
        console.log(error);
        this.toastr.error('There was a technical error fetching waybill data. [er-getAW]', '', {
          positionClass: 'toast-top-center',
          timeOut: 3000,
          // closeButton: true,
          // disableTimeOut: true,
        });
        
      }

    }); //end subscribe get all
  }

  // get single waybill
  getSingleWaybill(waybill_no):void{
    this.loading_msg = "Loading waybill "+waybill_no;
    this.spinner.show();
    this._waybillService.getSingleWaybillServ(waybill_no).subscribe({
      next: data => {
          this.single_waybill.push(data);;
          this.spinner.hide();
          this.loading_msg = "";
          this.open_waybill = true;
          this.statusBadgeClass(data['qoute'].delivery_status, data['qoute'].payment_status);

          this.changeDriverForm.value.branch = data['qoute'].branch;
          this.changeDriverForm.value.driver_id = data['qoute'].driver_id;

          this.trackinStatusForm.value.delivery_status = data['qoute'].delivery_status;
          this.trackinStatusForm.value.delivery_note = data['qoute'].delivery_note;
          this.trackinStatusForm.value.signed_on = data['qoute'].signed_on;
          this.trackinStatusForm.value.signed_by = data['qoute'].signed_by;


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

  statusBadgeClass(d_status, p_status){

    if ( d_status === 'pending') {
      this.d_status_badge = "badge-warning";
      this.d_status_badge_table = "badge-warning";
    }
    if ( d_status === 'pickup') {
      this.d_status_badge = "badge-secondary";
      this.d_status_badge_table = "badge-secondary";
    }
    if ( d_status === 'at_branch') {
      this.d_status_badge = "badge-default";
      this.d_status_badge_table = "badge-default";
    }
    if ( d_status === 'in_transit') {
      this.d_status_badge = "badge-primary";
      this.d_status_badge_table = "badge-primary";
    }
    if ( d_status === 'delivered') {
      this.d_status_badge = "badge-success";
      this.d_status_badge_table = "badge-success";
    }
    if ( d_status === 'cancelled') {
      this.d_status_badge = "badge-danger";
      this.d_status_badge_table = "badge-danger";
    }
  }

  closeWaybillView(){
    this.open_waybill = false;
    this.single_waybill.length = 0;
    this.loading_msg = "";
  }

  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }



  // Update tracking status
  clearEFTpay(){
    this.toastr.success('Payment status updated successfully.', 'Payment updated', {
      positionClass: 'toast-top-center',
      timeOut: 3000,
      // closeButton: true,
      // disableTimeOut: true,
    });
  }

  // Update tracking status
  emailWaybill(){
    this.toastr.success('Waybill has been emailed to .', 'Done', {
      positionClass: 'toast-top-center',
      timeOut: 3000,
      // closeButton: true,
      // disableTimeOut: true,
    });
  }

  // Update tracking status
  emailWaybillPayReminder(){
    this.toastr.success('Payment reminder emailed to.', 'Done', {
      positionClass: 'toast-top-center',
      timeOut: 3000,
      // closeButton: true,
      // disableTimeOut: true,
    });
  }

  cancelWayblill(){
    this.toastr.success('The waybill has been cancelled.', 'Cancelled', {
      positionClass: 'toast-top-center',
      timeOut: 3000,
      // closeButton: true,
      // disableTimeOut: true,
    });
  }


}
