import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {tap, first} from "rxjs/operators";

import { WaybillService } from "../../services/waybills.service";

@Component({
  selector: 'app-new-collection',
  templateUrl: './new-collection.component.html',
  styleUrls: ['./new-collection.component.css']
})
export class NewCollectionComponent implements OnInit {

  //Local Variable defined 
  public provinceList = [
    'Eastern Cape',
    'Free State',
    'Gauteng',
   'KwaZulu-Natal',
    'Limpopo',
    'Mpumalanga',
    'Northern Cape',
    'North West',
    'Western Cape'
  ];
  public googleFromAddress=" "; 
  public googleToAddress=" "; 
  public fromRegion = "";
  public toRegion = "";
  public rates = [];
  public additional_rates = [];
  public calculated_rates = {};
  checkoutForm;

  formLoading = false;
  formSuccess = false;
  public showServicesForm = false;
  public loading_msg;

  // Google autocompete options
  options={ 
    componentRestrictions:{ 
      country:["ZA"] 
    } 
  } 

  // Form collection group
  collectFormGroup: FormGroup;

  constructor(
              private waybill: WaybillService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private fB: FormBuilder,
             ) { }

  ngOnInit(): void {
    this.getRates();

    this.collectFormGroup = this.fB.group({
      qoute_id:"",
      cust_name: ['',[Validators.required]],
      surname: ['',[Validators.required]],
      cellphone: ['',[Validators.required]],
      email_addr: ['',[Validators.required]],
      company_name: '',
      receiver_name: ['',[Validators.required]],
      receiver_phone: ['',[Validators.required]],
      receiver_email: ['',[Validators.required]],
      receiver_company: ['',[Validators.required]],
      destination_address: [this.googleToAddress,[Validators.required]],
      pickup_address: [this.googleFromAddress,[Validators.required]],
      collection_branch: this.fromRegion,
      destination_branch:this.toRegion,
      pickup_postal_code:'',
      service_type: ['',[Validators.required]],
      receival_method: "",
      final_price: '',
      vat_price: '',
      mincharge_price: '',
      per_kg_price: '',
      fuel_price: '',
      branch:'',
      status: '',
      delivery_status: '',
      payment_status : '',
      cust_login_id: '',
      special_note: '',
      modified_by: '',
      admin_weight: '',
      admin_length: '',
      admin_height: '',
      admin_width: '',
      pack_desc:'',
      no_dimentions:false,
      accept_terms:[false,[Validators.requiredTrue]],
      packages:this.fB.array([]),
    });

    // On form change
    this.collectFormGroup.valueChanges.subscribe( ()=>{
      this.collectFormGroup.value.pickup_address = this.googleFromAddress;
      this.collectFormGroup.value.collection_branch = this.fromRegion;

      this.collectFormGroup.value.destination_address = this.googleToAddress;
      this.collectFormGroup.value.destination_branch = this.toRegion;

      let packages_obj = this.collectFormGroup.value.packages;

      if(this.collectFormGroup.value.no_dimentions){
        packages_obj.forEach((value, i) => {
          this.collectFormGroup.value.admin_weight = "";
          this.collectFormGroup.value.admin_height = "";
          this.collectFormGroup.value.admin_length = "";
          this.collectFormGroup.value.admin_width =  ""; 
          this.collectFormGroup.value.final_price= '';
          this.collectFormGroup.value.vat_price = '';
          this.collectFormGroup.value.mincharge_price = '';
          this.collectFormGroup.value.per_kg_price = '';
          this.collectFormGroup.value.fuel_price = '';       
        });
   
      }else{
        packages_obj.forEach((value, i) => {
          this.collectFormGroup.value.admin_weight = this.collectFormGroup.value.admin_weight + value.weight;
          this.collectFormGroup.value.admin_height = this.collectFormGroup.value.admin_height + value.height;
          this.collectFormGroup.value.admin_length = this.collectFormGroup.value.admin_length + value.length;
          this.collectFormGroup.value.admin_width =  this.collectFormGroup.value.admin_width + value.width;        
        });
  
      }

      if(this.googleFromAddress !== "" 
         &&  this.fromRegion !== ""
         &&  this.googleToAddress !== ""
         &&  this.toRegion !== ""
         && packages_obj.length !== 0
        ){

          if (this.collectFormGroup.value.service_type !== "") {
            this.getCalculatedRates();
           }

          this.showServicesForm = true;
          
         }else if ( this.collectFormGroup.value.no_dimentions ) {

           this.showServicesForm = true;
           this.calculated_rates = {};
           this.collectFormGroup.value.no_dimentions = false;
           this.collectFormGroup.value.packages.length = 0;
          //  this.packagesForms.length = 0;
           
         }else{
          this.showServicesForm = false;
          this.calculated_rates = {};
          this.collectFormGroup.value.no_dimentions = false;
          this.collectFormGroup.value.service_type = "";
         }


        //  console.log(this.collectFormGroup.value.service_type);
         

    }); //end form change
     
    console.log(this.collectFormGroup.get('cust_name').value );
    
  } //end init

  // Multiple packages form
  get packagesForms() {
    return this.collectFormGroup.get('packages') as FormArray;
  }

  // Form Messages
  get fromAddress(){
    return this.collectFormGroup.get('pickup_address');
  }

  get toAddress(){
    return this.collectFormGroup.get('destination_address');
  }

  get acceptTerms(){
    return this.collectFormGroup.get('accept_terms');
  }

  get chooseAService(){
    return this.collectFormGroup.get('service_type');
  }

  // Add another Parcel
  anotherPackage(){
    const packages = this.fB.group({
      weight: [],
      length: [],
      width: [],
      height: [],
      pack_desc: [],
    })

    this.packagesForms.push(packages);
  }

  // Delete Parcel
  deletePack(i){
    this.packagesForms.removeAt(i);
  }

  // Google from address change
  public fromAddressChange(address: any) { 
    //setting address from API to local variable 
    this.googleFromAddress = address.formatted_address 

    address.address_components.map((value, i) => {
      this.provinceList.map((province, j) => {        
        if (value.long_name == province) {
          this.fromRegion = value.long_name;
        }
      });

      this.collectFormGroup.value.pickup_address = this.googleFromAddress;
      this.collectFormGroup.value.collection_branch = this.fromRegion;

    }); 
    
    this.getRates();
  }
  
  // Google to address
  public toAddressChange(address: any) { 
    //setting address from API to local variable 
    this.googleToAddress=address.formatted_address 

    address.address_components.map((value, i) => {
      this.provinceList.map((province, j) => {        
        if (value.long_name == province) {
          this.toRegion = value.long_name;
        }
      });

      this.collectFormGroup.value.destination_address = this.googleToAddress;
      this.collectFormGroup.value.destination_branch = this.toRegion;
    }); 
    this.getRates();
  }

  // Http Get rates
  getRates(){
    if (this.toRegion !== "" && this.fromRegion) {
      this.waybill.getRatesServ(this.toRegion, this.fromRegion).subscribe({
        next: data => {
          this.rates.length = 0;
          this.additional_rates.length = 0;

          data['rates'].map((value, i) => {
            this.rates.push(value);
          });
          data['rates_additional'].map((value, i) => {
            this.additional_rates.push(value);
          });
        
          console.log(this.rates);
        },
        error: error => {
          this.spinner.hide();
          this.loading_msg = "";
          console.log(error);
          this.toastr.error('There was a technical error, please contact support. [er-getRts]', '', {
            positionClass: 'toast-top-center',
            timeOut: 5000,
            // closeButton: true,
            // disableTimeOut: true,
          });
          
        }
      });

    }
  }

  // Http Get calculations
  getCalculatedRates(){
    this.waybill.getCalculatedRatesServ(this.collectFormGroup.value).subscribe({
      next: data => {
      this.calculated_rates = {};
      this.calculated_rates = data['rates'];

      console.log( data['rates']['grand_total'] );
      
      this.collectFormGroup.value.final_price = data['rates']['grand_total'];
      this.collectFormGroup.value.vat_price = data['rates']['vat_amt'];
      this.collectFormGroup.value.mincharge_price = data['rates']['min_cost'];
      this.collectFormGroup.value.per_kg_price = data['rates']['freight_cost'];
      this.collectFormGroup.value.fuel_price = data['rates']['fuel_cost'];
      
      console.log(this.calculated_rates);
    },
    error: error => {
      this.spinner.hide();
      this.loading_msg = "";
      console.log(error);
      this.toastr.error('There was a technical error calculating rates. [er-getRCal]', '', {
        positionClass: 'toast-top-center',
        timeOut: 3000,
        // closeButton: true,
        // disableTimeOut: true,
      });
      
    }

    });
  }

  // Submit request
  async submitFormRequest(){
    this.formLoading = true;

    const formValue = this.collectFormGroup.value;

    try {

      if( this.collectFormGroup.invalid ){
        this.toastr.warning('Please fill in all required details.', '', {
          positionClass: 'toast-top-center',
          timeOut: 3000,
          // closeButton: true,
          // disableTimeOut: true,
        });

        if(  this.collectFormGroup.value.service_type == "" ){
          this.toastr.error('Please select a service.', '', {
            positionClass: 'toast-top-center',
            timeOut: 5000,
            // closeButton: true,
            // disableTimeOut: true,
          });
        }
        if(  !this.collectFormGroup.value.accept_terms){
          this.toastr.error('You must accept the terms and conditions in order to continue.', '', {
            positionClass: 'toast-top-center',
            timeOut: 5000,
            // closeButton: true,
            // disableTimeOut: true,
          });
        }
        if( this.googleFromAddress == "" ){
          this.toastr.error('Enter and select a collection address.', '', {
            positionClass: 'toast-top-center',
            timeOut: 5000,
            // closeButton: true,
            // disableTimeOut: true,
          });
        }

        if( this.googleToAddress == "" ){
          this.toastr.error('Enter and select a destination address.', '', {
            positionClass: 'toast-top-center',
            timeOut: 5000,
            // closeButton: true,
            // disableTimeOut: true,
          });
        }


      }else{
        
        this.spinner.show();
        this.loading_msg = "Processing...";

        this.waybill.postWaybill(this.collectFormGroup.value).subscribe({
          next: data => {
            this.spinner.hide();
            this.loading_msg = "";
            this.formSuccess = true;
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
        
      }

    } catch (error) {
      console.log(error);
      this.formLoading = false;
      this.formSuccess = false;
      if( this.googleFromAddress == "" ){
        this.toastr.error('There has been an error making request.', '', {
          positionClass: 'toast-top-center',
          timeOut: 5000,
          // closeButton: true,
          // disableTimeOut: true,
        });
      }
    }

    
  }

  

}
