import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

// Services
import {ClientscustomersService} from '../../services/clientscustomers.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loading_msg = "";

  constructor(
    private _customerService: ClientscustomersService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  submitLogin(username, user_pass){
    this.spinner.show();
    this.loading_msg = "Logging you in...";

    if( username == "" || user_pass == ""){
      this.spinner.hide();
      this.loading_msg = "";
      this.toastr.error('Please enter both your email and password', '', {
        positionClass: 'toast-top-center',
        closeButton: true,
        disableTimeOut: false,
      });
    }else{

      this._customerService.loginCustomer(username, user_pass).subscribe({
        next: data => {
          
          this.spinner.hide();
          this.loading_msg = "";

          if( data['status'] == "error" ){
            this.toastr.error( data['msg'], '', {
              positionClass: 'toast-top-center',
              closeButton: true,
              disableTimeOut: false,
            });
          }

          if( data['status'] == "success" ){
            localStorage.setItem('userToken', data['api_key']);
            localStorage.setItem('userID', data['user']);

            this.router.navigate(['/waybills']);
          }
  
          
          console.log( data );
          
        },error: error => {
          this.spinner.hide();
          this.loading_msg = "";
          
          this.toastr.error('Error', '', {
            positionClass: 'toast-top-center',
            closeButton: true,
            disableTimeOut: true,
          });
  
        }
      });
      
    }


    
  }

}
