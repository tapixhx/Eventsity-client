import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ServerService } from '../services/server.service';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-registrationform',
  templateUrl: './registrationform.component.html',
  styleUrls: ['./registrationform.component.css']
})
export class RegistrationformComponent implements OnInit {
  id:any;

  constructor(private route : ActivatedRoute,
              private serverservice : ServerService,
              private ngxService: NgxUiLoaderService,
              private router : Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
  }

  register(form : NgForm) {
    this.ngxService.start();
    const value = form.value;
    // console.log(this.id);
    this.serverservice.register(value.name, value.email, this.id)
    .subscribe(
      (response) =>{
        // console.log(response);
        this.ngxService.stop();
        Swal.fire({
          type: 'success',
          title: 'Successfully Registered',
          showConfirmButton: false,
          timer: 2000,
        })
        this.router.navigate(['/discover',this.id]);
      },
      (error) =>{
        // console.log(error);
        this.ngxService.stop();
        Swal.fire({
          type: 'error',
          title: error.error.message,
        })
      }
    )
  }

  back() {
    this.router.navigate(['/discover',this.id]);
  }

}
