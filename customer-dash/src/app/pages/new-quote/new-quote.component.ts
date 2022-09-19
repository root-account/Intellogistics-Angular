import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {tap, first} from "rxjs/operators";
import { Subscription } from "rxjs";


import { WaybillService } from "../../services/waybills.service";

@Component({
  selector: 'app-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrls: ['./new-quote.component.css']
})
export class NewQuoteComponent implements OnInit {

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
  public loggedInId= localStorage.getItem('userID');
  public isLoggedIn = false;
  
  public googleFromAddress=" "; 
  public googleToAddress=" "; 
  public fromRegion = " ";
  public toRegion = " ";
  public all_quotes = [];
  public all_services = [];
  public selected_courier = [];
  public selectedProvider = "";
  public totalDimensions;
  public service_desc;

  public total_width = 0;
  public total_height = 0;
  public total_weight = 0;
  public total_length = 0;
  public parcel_volume = 0;

  public calculated_rates = [];
  public user_data = [];
  public service_provider_data = [];

  checkoutForm;

  formLoading = false;
  formSuccess = false;
  public showServicesForm = false;
  public loading_msg;

  obs: Subscription;

  // Google autocompete options
  options={ 
    componentRestrictions:{ 
      country:["ZA"] 
    } 
  } 

  // Form collection group
  collectFormGroup: FormGroup;
  userDetailsFormGroup: FormGroup;

  constructor(
              private waybill: WaybillService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private fB: FormBuilder,
             ) { }

  ngOnInit(): void {
    this.selected_courier.length = 0;
    this.get_loggedin_user();

    this.collectFormGroup = this.fB.group({
      destination_address: [this.googleToAddress,[Validators.required]],
      pickup_address: ['',[Validators.required]],
      collection_branch:['',[Validators.required]] ,
      destination_branch:['',[Validators.required]],
      pickup_postal_code:'',
      service_type: ['',[Validators.required]],
      modified_by: '',
      pack_desc:'',
      no_dimentions:false,
      packages:this.fB.array([]),
      service_provider_id: '',
    });

    this.userDetailsFormGroup = this.fB.group({
      cust_name: ['',[Validators.required]],
      surname: ['',[Validators.required]],
      cellphone: ['',[Validators.required]],
      email_addr: ['',[Validators.required]],
      company_name: '',
      receiver_name: ['',[Validators.required]],
      receiver_phone: ['',[Validators.required]],
      receiver_email: ['',[Validators.required]],
      receiver_company: ['',[Validators.required]],
      special_note: '',
      accept_terms:[false,[Validators.requiredTrue]],
    });

    
    console.log(this.googleFromAddress);
    console.log(this.googleToAddress);

    console.log(this.fromRegion);
    console.log(this.toRegion);


    // On form change collectFormGroup
    this.collectFormGroup.valueChanges.subscribe( ()=>{
          let packages_obj = this.collectFormGroup.value.packages;

          this.total_weight = 0,
            this.total_height = 0,
            this.total_length = 0,
            this.total_width = 0,  

          packages_obj.forEach((value, i) => {
            this.total_weight = this.total_weight + value.weight,
            this.total_height = this.total_height + value.height,
            this.total_length = this.total_length + value.length,
            this.total_width = this.total_width + value.width,  

            this.totalDimensions = {
                total_weight : this.total_weight,
                total_height : this.total_height,
                total_length : this.total_length,
                total_width :  this.total_width,   
              }; 


  
          });

          this.get_all_services_func();

          
          if (this.collectFormGroup.value.service_type !== "") {
            this.get_all_calculated_quotes();
          }
          

          this.fromAddressChange(this.collectFormGroup.value.pickup_address);
          this.toAddressChange(this.collectFormGroup.value.destination_address);

          this.fromRegion = this.collectFormGroup.value.collection_branch; 
          this.toRegion = this.collectFormGroup.value.destination_branch; 
          
          
    }); //end form change

    // On form change collectFormGroup
    // this.collectFormGroup.get('service_type').valueChanges.subscribe(val => {
         
    // });//end form change

    // // On form change collectFormGroup
    this.userDetailsFormGroup.valueChanges.subscribe( ()=>{
      
    }); //end form change
   
     

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
    console.log(this.collectFormGroup.value.packages);

    if(this.collectFormGroup.value.packages.length == 0){
      this.all_services.length = 0;
      this.service_desc = "";
      this.selected_courier.length = 0;
      this.selectedProvider = "";
      this.all_quotes.length = 0;
      this.calculated_rates = [];
      this.showServicesForm = false;
      this.collectFormGroup.controls['service_type'].setValue("");
    }else{
      this.get_all_calculated_quotes();
    }

  }

  // Google from address change
  public fromAddressChange(address: any) { 
    // this.collectFormGroup.controls['service_type'].setValue("");
    //setting address from API to local variable 
    // this.googleFromAddress = address.formatted_address 
 
    // Google from address
    // address.address_components.map((value, i) => {
    //   this.provinceList.map((province, j) => {        
    //     if (value.long_name == province) {
    //       this.fromRegion = value.long_name;
    //     }
    //   });


    //   this.collectFormGroup.controls['pickup_address'].setValue(this.googleFromAddress);
    //   this.collectFormGroup.controls['collection_branch'].setValue(this.fromRegion);

    //   this.collectFormGroup.controls['service_type'].setValue("");
    // }); 

    
    this.selected_courier.length = 0;
    this.selectedProvider = "";
    this.all_quotes.length = 0;
    this.get_all_services_func();
  }
  
  // Google to address
  public toAddressChange(address: any) { 
    // this.collectFormGroup.controls['service_type'].setValue("");
    
    // //setting address from API to local variable 
    // this.googleToAddress = address.formatted_address 

    // address.address_components.map((value, i) => {
    //   this.provinceList.map((province, j) => {        
    //     if (value.long_name == province) {
    //       this.toRegion = value.long_name;
    //     }
    //   });

    //   this.collectFormGroup.controls['destination_address'].setValue(this.googleToAddress);
    //   this.collectFormGroup.controls['destination_branch'].setValue(this.toRegion);
      
    // }); 

    this.selected_courier.length = 0;
    this.selectedProvider = "";
    this.all_quotes.length = 0;

    this.get_all_services_func();
  }

  // SELECT COURIER
  selectCourier(index){

    this.selected_courier.length = 0;
    this.selected_courier = this.all_quotes[index];
    this.service_desc = this.selected_courier['rates'].service_desc

    console.log(this.selected_courier['rates'].volumetric_weight); 
    console.log(this.selected_courier['rates'].weight); 

    this.selectedProvider = this.selected_courier['company_data'].serviceProviderID;

    
  }



  // HTTP Get service provider
  get_loggedin_user(){

    this.spinner.show();
    this.loading_msg = "Fetching your details, just a moment please...";

    this.obs = this.waybill.get_single_user(this.loggedInId).subscribe({
      next: data => {
      this.user_data = [];
      this.user_data = data;

      console.log(this.user_data);

      this.spinner.hide();
      this.loading_msg = ""; 
      

      console.log(this.service_provider_data.length);
      console.log(this.isLoggedIn);
    
      if( this.user_data['details'] !== null ){
        console.log(this.user_data['service_provicer'].serviceProviderID);

        this.isLoggedIn = true;


        if (this.user_data['service_provicer'] !== null) {

          // this.selectedProvider = this.user_data['service_provicer'].serviceProviderID;
          this.service_provider_data = this.user_data['service_provicer'];
          this.collectFormGroup.controls['service_provider_id'].setValue(this.user_data['service_provicer'].serviceProviderID);

          // set form data
          this.userDetailsFormGroup.controls['cust_name'].setValue(this.user_data['details'].names);
          this.userDetailsFormGroup.controls['surname'].setValue(this.user_data['details'].surname);
          this.userDetailsFormGroup.controls['email_addr'].setValue(this.user_data['details'].user_email);
          this.userDetailsFormGroup.controls['cellphone'].setValue(this.user_data['details'].phone_no);
          
          
        }else{
          this.toastr.error('You are not subscribed to any couriers...', '', {
            positionClass: 'toast-top-center',
            closeButton: true,
            // disableTimeOut: true,
          });
        }

      }else{
        this.toastr.error('You are not logged in.', '', {
          positionClass: 'toast-top-center',
          closeButton: true,
          // disableTimeOut: true,
        });

        this.service_provider_data = {};
      }
     
    },
    error: error => {
      this.spinner.hide();
      this.loading_msg = "";
      console.log(error);
      this.toastr.error('There was a technical error getting user data. [er-getRCal]', '', {
        positionClass: 'toast-top-center',
        timeOut: 3000,
        // closeButton: true,
        // disableTimeOut: true,
      });
      
    }

    });
  }


  // Http Get all calculations
  get_all_calculated_quotes(){

    let packages_obj = this.collectFormGroup.value.packages;
 
    if(this.googleFromAddress !== "" 
         &&  this.fromRegion !== ""
         &&  this.googleToAddress !== ""
         &&  this.toRegion !== ""
         && packages_obj.length !== 0
      ){

        if (packages_obj[0].weight && packages_obj[0].height  && packages_obj[0].length  && packages_obj[0].width ) {

          this.spinner.show();
          this.loading_msg = "Fetching quotes...";

          this.waybill.get_all_quotes(this.collectFormGroup.value, this.totalDimensions).subscribe({
            next: data => {
            this.selected_courier.length = 0;
            this.selectedProvider = "";
            this.all_quotes.length = 0;
            this.all_quotes = data;
            
            if (this.all_quotes.length > 0) {
              this.service_desc = this.all_quotes[0]['rates'].service_desc;
              this.parcel_volume = this.all_quotes[0]['rates'].volumetric_weight;

              console.log(this.totalDimensions);
              
              this.selected_courier.length = 0;
              this.selected_courier = this.all_quotes[0];
              
              this.service_desc = this.selected_courier['rates'].service_desc;
              this.calculated_rates = this.selected_courier['rates'];

              console.log(this.selected_courier);

            }else{
              this.calculated_rates = {};
            }
            
            this.spinner.hide();
            this.loading_msg = "";
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
          this.showServicesForm = true;
        }else{
          this.selected_courier.length = 0;
          this.selectedProvider = "";
          this.all_quotes.length = 0;
          this.showServicesForm = false;
        }
        
        
      }

    
  }

  // Http Get all services
  get_all_services_func(){

    let packages_obj = this.collectFormGroup.value.packages;

    if(this.googleFromAddress !== "" 
         &&  this.fromRegion !== ""
         &&  this.googleToAddress !== ""
         &&  this.toRegion !== ""
         && packages_obj.length !== 0
      ){

        if (packages_obj[0].weight && packages_obj[0].height  && packages_obj[0].length  && packages_obj[0].width ) {
          this.waybill.get_all_services(this.collectFormGroup.value).subscribe({
            next: data => {
            this.all_services.length = 0;
            this.all_services = data;
            this.service_desc = "";
            
            console.log(this.all_services);
            
            console.log(this.collectFormGroup.value);

            console.log(this.fromRegion);
            console.log(this.toRegion);
            

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
          this.showServicesForm = true;
        }else{
          this.all_services.length = 0;
          this.showServicesForm = false;
        }
        
        
      }


  }

  // Submit request
  async submitFormRequest(){
    this.formLoading = true;


    try {

      if( this.collectFormGroup.invalid || this.userDetailsFormGroup.invalid ){
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
        if(  !this.userDetailsFormGroup.value.accept_terms){
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

        this.waybill.postWaybill(this.collectFormGroup.value, this.userDetailsFormGroup.value, this.totalDimensions ,this.selected_courier).subscribe({
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


  ngOnDestroy(): void {
    // this.waybill.get_single_user('').unsubscribe();
    this.obs.unsubscribe();
  }
  
  

}
