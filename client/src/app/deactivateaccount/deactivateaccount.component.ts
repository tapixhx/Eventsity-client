import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from '../services/server.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deactivateaccount',
  templateUrl: './deactivateaccount.component.html',
  styleUrls: ['./deactivateaccount.component.css']
})
export class DeactivateaccountComponent implements OnInit {

  constructor(private serverservice : ServerService,
              private ngxService : NgxUiLoaderService,
              private router : Router) { }

  ngOnInit() {
  }

  back() {
    this.router.navigate(['/myevents']);
  }

  onDeactivate(form:NgForm) {
    this.ngxService.start();
    const value = form.value;
    this.serverservice.deactivateUser(value.cpassword)
    .subscribe(
      (response) => {
        console.log(response);
        this.ngxService.stop();
        this.router.navigate(['/']);
        Swal.fire({
          type:'success',
          title:'Successfully deactivated your account',
          showConfirmButton:false,
          timer:1500,
        })
        localStorage.removeItem('token');
        localStorage.removeItem('name');
      },
      (error) => {
        console.log(error);
        this.ngxService.stop();
        Swal.fire({
          type:'error',
          title:error.error.message,
        })
      }
    )
  }

}
