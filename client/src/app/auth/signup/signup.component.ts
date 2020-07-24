import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  err:any;
  errorMsg:string;
  uid:any;

  constructor(private serverservice : ServerService,
              private route : Router,
              private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
  }
  onSignup(form : NgForm) {
    this.ngxService.start();
    // console.log(JSON.stringify(form.value));
    const value = form.value;
    this.serverservice.signUpUser(value.name,value.email,value.password,value.cpassword)
    .subscribe(
      (response) => {
        this.uid = response;
        console.log(response);
        // console.log(this.uid.userId);
        this.ngxService.stop(); 
        // this.route.navigate(['/verify',this.uid.userId]);
        // form.reset();
      },
      (error: HttpErrorResponse) =>{
        console.log(error);
        this.errorMsg = error.error.data[0].msg;
        this.ngxService.stop();
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: this.errorMsg,
        })
      },
      );
  }
}
