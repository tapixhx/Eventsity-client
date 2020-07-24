import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ServerService } from '../services/server.service';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
  id:any;

  constructor(private route : ActivatedRoute,
              private serverservice : ServerService,
              private router : Router,
              private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
  }

  sendEnquiry(form : NgForm) {
    this.ngxService.start();
    const value = form.value;
    // console.log(this.id);
    this.serverservice.sendenquiry(value.enquiry, this.id)
    .subscribe(
      (response) =>{
        // console.log(response);
        this.ngxService.stop(); 
        Swal.fire({
          type: 'success',
          title: 'Enquiry Sent',
          showConfirmButton: false,
          timer: 1500,
        })
        this.router.navigate(['/discover']);
      },
      (error) =>{ 
        // console.log(error);
        this.ngxService.stop(); 
        Swal.fire({
          type:'error',
          title:'Oops...',
          text: error.error.message,
        })
      },
    )
  }

  back() {
    this.router.navigate(['/discover',this.id]);
  }

}
