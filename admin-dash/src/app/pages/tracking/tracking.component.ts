import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { WaybillService } from "../../services/waybills.service";

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  public loading_msg;
  public formSuccess = false;
  public dataFound = false;
  public tracking_data = {};

  trackingFormGroup: FormGroup;
  
  constructor(
    private waybill: WaybillService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private fB: FormBuilder,
   ) { }

  ngOnInit(): void {
    
    this.trackingFormGroup = this.fB.group({
      waybill_no: ['',[Validators.required]],
    });

  }


  submitFormRequest(){


        this.spinner.show();
        this.loading_msg = "Finding parcel...";

        if (this.trackingFormGroup.value.waybill_no !== "") {
          this.waybill.TrackWaybill(this.trackingFormGroup.value.waybill_no).subscribe({
              next: data => {
                this.spinner.hide();
                this.loading_msg = "";
                this.formSuccess = true;
    
                console.log(data);
    
                if (data['waybill'] !== null ) {
                  this.dataFound = true;
                }else{
                  this.dataFound = false;
                }
    
                this.tracking_data = data;
                
    
              },
              error: error => {
                this.spinner.hide();
                this.loading_msg = "";
                console.log(error);
                this.toastr.error('There was an error processing your request.', '', {
                  positionClass: 'toast-top-center',
                  timeOut: 3000,
                  // closeButton: true,
                  // disableTimeOut: true,
                });
                
              }
          })
        }else{
          this.toastr.error('Enter waybill number.', '', {
            positionClass: 'toast-top-center',
            timeOut: 3000,
            // closeButton: true,
            // disableTimeOut: true,
          });
        }

        


  }

}
