import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  tk :any;
  errormsg:string;
  uid:any;
  name:any;
  constructor(private serverservice : ServerService,
              private route: Router,
              private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
  }

  onLogin(form : NgForm) {
    this.ngxService.start();
    // console.log(JSON.stringify(form.value));
    const value = form.value;
    this.serverservice.logInUser(value.email,value.password)
    .subscribe(
      (response) => {
        // console.log(response);
        this.tk = response ;
        // console.log(this.name.name);
        localStorage.setItem('token', this.tk.token);
        localStorage.setItem('name',this.tk.name);
        this.ngxService.stop();
        Swal.fire({
          type: 'success',
          title: 'LoggedIn',
          text: 'Successfully LoggedIn',
          showConfirmButton:false,
          timer : 2000,
        })
        this.route.navigate(['/']);
      },
      (error: HttpErrorResponse) =>{
        console.log(error);
        this.errormsg = error.error.message;
        // console.log(this.errormsg);
        this.ngxService.stop();
        if(this.errormsg === "User is not verified") {
          this.uid = error.error.userId;
          // console.log(this.uid);
          this.route.navigate(['/verify',this.uid])
        }
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: this.errormsg,
        })
      },
    );
  }

}
