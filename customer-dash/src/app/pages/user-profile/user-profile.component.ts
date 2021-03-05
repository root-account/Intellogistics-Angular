import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClientscustomersService } from 'src/app/services/clientscustomers.service';
import { WaybillService } from 'src/app/services/waybills.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public loggedInId= localStorage.getItem('userID');
  public loading_msg = "";
  public user_data = [];

  userProfileFormGroup: FormGroup;

  constructor(
    private _waybillService: WaybillService,
    private _customerService: ClientscustomersService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private fB: FormBuilder
  ){ 
    
  }

  

  ngOnInit() {
    this.userProfileFormGroup = this.fB.group({
      userid: ['',[Validators.required]],
      email: ['',[Validators.required]],
      firstname: ['',[Validators.required]],
      lastname: ['',[Validators.required]],
      address: '',
      company: ['',[Validators.required]],
      phone_no: ['',[Validators.required]],
      alt_no: ['',[Validators.required]],
    });

    this.getCustomersData();
  }


   // Get all Waybills
   getCustomersData(){
    this.spinner.show();
    this.loading_msg = "Fetching your information....";

    this._customerService.getCustomersData(this.loggedInId).subscribe({
      next: data => {
        this.user_data = data;

        this.spinner.hide();
        this.loading_msg = "";

        console.log(data);
        


      },error: error => {
        
        this.spinner.hide();
        this.loading_msg = "";

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




}
