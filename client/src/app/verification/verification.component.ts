import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  id:any;
  resend=false;
  tk:any;
  name:any;

  constructor(private serverservice: ServerService,
              private route: ActivatedRoute,
              private router: Router,
              private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    // console.log(this.id);
    setTimeout(() => {
      this.resend=true;
    }, 120000);
  }

  onResend() {
    this.ngxService.start();
    this.resend = false;
    setTimeout(() => {
      this.resend = true;
    }, 120000);
    this.serverservice.resendOtp(this.id)
    .subscribe(
      (response) =>{
        //  console.log(response);
         this.ngxService.stop();
         Swal.fire({
           type:'success',
           title:'Seccessfully sent OTP',
           showConfirmButton:false,
           timer:1500,
         })
        },
      (error) =>{ 
        // console.log(error);
        this.ngxService.stop();
        Swal.fire({
          type:'error',
          title:'Oops..',
          text:error.error.message,
          showConfirmButton:false,
          timer:1500,
        })
      },
    );
  }
  
  Verify(form : NgForm) {
    this.ngxService.start();
    const value = form.value;
    // console.log(this.id);
    this.serverservice.verifyUser(value.otp, this.id)
    .subscribe(
      (response) =>{ 
        this.tk = response ;
        this.name = response;
        // console.log(this.name.name);
        localStorage.setItem('token', this.tk.token);
        localStorage.setItem('name',this.name.name);
        this.ngxService.stop();
        Swal.fire({
          type: 'success',
          title: 'Verified Successfully',
          showConfirmButton: false,
          timer: 1500,
        })
        this.router.navigate(['/']);
      },
      (error) =>{
        // console.log(error),
        this.ngxService.stop();
        Swal.fire({
          type: 'error',
          title: 'Wrong OTP!!',
          showConfirmButton: false,
          timer: 2000,
        })
      } 
    );
  }
}