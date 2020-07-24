import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  enttype=false;
  sportstype=false;
  socialtype=false;
  techtype=false;
  errormsg:string;
  selectedFile = null;


  constructor(private router : Router,
              private serverservice : ServerService,
              private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
  }

  onCreate(form : NgForm) {
    this.ngxService.start();
    // console.log('Entered Create');
    const value = form.value;
    this.serverservice.createEvent(value.ename, value.category, value.evenue, value.fevenue, value.imagePath, 
      value.date, value.orgname, value.description)
      .subscribe(
        (response) =>{ 
          console.log(response);
          this.ngxService.stop();
          // this.router.navigate(['/discover']);
        },
        (error:HttpErrorResponse) =>{ 
          console.log(error);
          this.errormsg = error.error.message;
          if(this.errormsg === "Not authenticated.") {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            Swal.fire({
              type:'warning',
              title:'Not Authenticated',
              text: 'LogIn again to continue',
              showConfirmButton:false,
              timer:1500,
            })  
            this.router.navigate(['/']);
          }
          this.ngxService.stop();
          if(this.errormsg != 'Not authenticated.') {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: this.errormsg,
          })
        }
        },
      );
  }
  onCancel() {
    this.router.navigate(['/discover']);
  }
}