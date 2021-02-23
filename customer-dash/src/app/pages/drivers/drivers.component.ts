import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import * as moment from 'moment';

import * as jQuery from 'jquery'; 
import { DriversService } from 'src/app/services/drivers.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  @ViewChild('dataTable') table;
  dataTable: any;
  dtOption: any = {};

  public Drivers$: Observable<DriversService[]>;

  public single_driver = [];
  public drivers = [];
  public all = [];
  public today = [];
  // public pending = [];
  // public pickup = [];
  // public cancelled = [];
  // public at_branch = [];
  // public delivered = [];
  // public in_transit = [];

  // public all_count;
  // public today_count;
  // public pending_count;
  // public pickup_count;
  // public cancelled_count;
  // public at_branch_count;
  // public delivered_count;
  // public in_transit_count;

  // public active_class = 'all';
  // public open_waybill = false;
  public loading_msg = "";
  // public d_status_badge ="";
  // public d_status_badge_table ="";

  trackinStatusForm : FormGroup;
  changeDriverForm : FormGroup;

  constructor(
              private _driverService: DriversService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private fB: FormBuilder,
            ){ 
              
            }

  ngOnInit(): void {
    this.spinner.show();
    this.loading_msg = "Loading drivers...";

    // this.dataTable = jQuery(this.table.nativeElement);
    // this.dataTable.DataTable();

    this.dtOption = {
      "paging":   false,
      "ordering": false,
      "info":     false
  };
    
      this.getAllDrivers();

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

      // change tracking status form Builder
      this.trackinStatusForm = this.fB.group({
        delivery_status: ['', Validators.required],
        payment_status:'',
        delivery_note: '',
        modified_by:'',
        signed_on:'',
        signed_by:'',
        driver_id:'',
        branch:'',
      });

      this.trackinStatusForm.valueChanges.subscribe(()=>{
          // console.log(this.trackinStatusForm.value);
          
      });

      // change driver form Builder
      this.changeDriverForm = this.fB.group({
        driver_id: ['', Validators.required],
        delivery_status: ['in_transit', Validators.required],
        payment_status:'',
        branch:['', Validators.required],
        delivery_note: '',
        modified_by:'',
        signed_on:'',
        signed_by:'',
      });

      this.changeDriverForm.valueChanges.subscribe(()=>{
        // console.log(this.changeDriverForm.value);
      });

  }

  // applyFilter(filter_term):void{

  //   this.active_class = filter_term;

  //   if ( filter_term === 'all') {
  //     this.waybills = this.all;
  //   }
  //   if ( filter_term === 'today') {
  //     this.waybills = this.today;
  //   }
  //   if ( filter_term === 'pending') {
  //     this.waybills = this.pending;
  //   }
  //   if ( filter_term === 'pickup') {
  //     this.waybills = this.pickup;
  //   }
  //   if ( filter_term === 'at_branch') {
  //     this.waybills = this.at_branch;
  //   }
  //   if ( filter_term === 'in_transit') {
  //     this.waybills = this.in_transit;
  //   }
  //   if ( filter_term === 'delivered') {
  //     this.waybills = this.delivered;
  //   }
  //   if ( filter_term === 'cancelled') {
  //     this.waybills = this.cancelled;
  //   }

  // }


  // Get all Waybills
  getAllDrivers(){
    this._driverService.getAllDrivers().subscribe({
      next: data => {
        this.drivers = data;
        this.all = data;
        console.log(data)
        // this.active_class = "all";

        // this.today.length = 0;
        // this.pending.length = 0;
        // this.pickup.length = 0;
        // this.at_branch.length = 0;
        // this.in_transit.length = 0;
        // this.delivered.length = 0;
        // this.cancelled.length = 0;

        // data.map((value, i) => {

          // let waybill_date = moment(value['date_created']).format('YYYY-MM-DD');

          // if ( moment(waybill_date).isSame(moment(), 'day') ) {
          //   this.today.push(value);
          // }
          // if ( value['payment_status'] === 'pending') {
          //   this.pending.push(value);
          // }
          // if ( value['delivery_status'] === 'pickup') {
          //   this.pickup.push(value);
          // }
          // if ( value['delivery_status'] === 'at_branch') {
          //   this.at_branch.push(value);
          // }
          // if ( value['delivery_status'] === 'in_transit') {
          //   this.in_transit.push(value);
          // }
          // if ( value['delivery_status'] === 'delivered') {
          //   this.delivered.push(value);
          // }
          // if ( value['delivery_status'] === 'cancelled') {
          //   this.cancelled.push(value);
          // }

          // this.all_count = this.all.length;
        //   this.pending_count = this.pending.length;
        //   this.pickup_count = this.pickup.length;
        //   this.at_branch_count = this.at_branch.length;
        //   this.in_transit_count = this.in_transit.length;
        //   this.delivered_count = this.delivered.length;
        //   this.cancelled_count = this.cancelled.length;
        //   this.today_count = this.today.length;

        //   this.statusBadgeClass(value['delivery_status'], value['payment_status'] )

        // });


        this.spinner.hide();
        this.loading_msg = "";
      },error: error => {
        this.spinner.show();
        this.loading_msg = "There was a technical error fetching driver data, if the problem persist please contact support.";
        console.log(error);
        this.toastr.error('There was a technical error fetching driver data. [er-getAW]', '', {
          positionClass: 'toast-top-center',
          timeOut: 3000,
          // closeButton: true,
          // disableTimeOut: true,
        });
        
      }

    }); //end subscribe get all
  }

  getSingleDriver(driver_id):void{
    this.loading_msg = "Loading waybill "+driver_id;
    this.spinner.show();
    this._driverService.getSingleDriver(driver_id).subscribe({
      next: data => {
          this.single_driver.push(data);;
          this.spinner.hide();
          this.loading_msg = "";
          // this.open_waybill = true;
          // this.statusBadgeClass(data['qoute'].delivery_status, data['qoute'].payment_status);

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

  // statusBadgeClass(d_status, p_status){

  //   if ( d_status === 'pending') {
  //     this.d_status_badge = "badge-warning";
  //     this.d_status_badge_table = "badge-warning";
  //   }
  //   if ( d_status === 'pickup') {
  //     this.d_status_badge = "badge-secondary";
  //     this.d_status_badge_table = "badge-secondary";
  //   }
  //   if ( d_status === 'at_branch') {
  //     this.d_status_badge = "badge-default";
  //     this.d_status_badge_table = "badge-default";
  //   }
  //   if ( d_status === 'in_transit') {
  //     this.d_status_badge = "badge-primary";
  //     this.d_status_badge_table = "badge-primary";
  //   }
  //   if ( d_status === 'delivered') {
  //     this.d_status_badge = "badge-success";
  //     this.d_status_badge_table = "badge-success";
  //   }
  //   if ( d_status === 'cancelled') {
  //     this.d_status_badge = "badge-danger";
  //     this.d_status_badge_table = "badge-danger";
  //   }
  // }

  // closeWaybillView(){
  //   this.open_waybill = false;
  //   this.single_waybill.length = 0;
  //   this.loading_msg = "";
  // }

  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }



}
