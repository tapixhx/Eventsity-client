import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  selectedFile: File = null;
  eventForm: FormGroup;
  res: any;


  constructor(private router : Router,
              private serverservice : ServerService,
              private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.eventForm = new FormGroup({
      'ename' : new FormControl(null, Validators.required),
      'imagePath' : new FormControl(null, Validators.required),
      'category' : new FormControl(null, Validators.required),
      'evenue' : new FormControl(null, Validators.required),
      'fevenue' : new FormControl(null, Validators.required),
      'date' : new FormControl(null, Validators.required),
      'description' : new FormControl(null, Validators.required),
    });
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onCreate(form : NgForm) {
    // this.ngxService.start();
    const value = form.value;
    const fd = new FormData();
    fd.append('ename', value.ename);
    fd.append('category', value.category);
    fd.append('evenue', value.evenue);
    fd.append('fevenue', value.fevenue);
    fd.append('imagePath', this.selectedFile);
    fd.append('imagePath', value.imagePath);
    fd.append('date', value.date);
    fd.append('description', value.description);

    // this.serverservice.createEvent(value.ename, value.category, value.evenue, value.fevenue, this.selectedFile, 
    //   value.date, value.orgname, value.description)
    this.serverservice.createEvent(fd)
      .subscribe(
        (response) =>{ 
          console.log(response);
          this.res=response;
          this.ngxService.stop();
          Swal.fire({
            type: 'success',
            title: 'Wohoo!!',
            text: this.res.message,
          })
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