import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editevent',
  templateUrl: './editevent.component.html',
  styleUrls: ['./editevent.component.css']
})
export class EditeventComponent implements OnInit {
  @ViewChild('f', { static:false }) editform : NgForm
  id:any;
  res:any;

  constructor(private route : ActivatedRoute,
              private serverservice : ServerService,
              private ngxService: NgxUiLoaderService,
              private router : Router) { }

  ngOnInit() {
    this.ngxService.start();
    this.id = this.route.snapshot.params.id;
    // console.log(this.id);
    this.serverservice.getEventsforEdit(this.id)
    .subscribe(
      (response) =>{
        this.res = response;
        console.log(this.res);
        this.editform.setValue({
          ename : this.res.event.ename,
          imagePath : this.res.event.imagePath,
          category : this.res.event.category,
          evenue : this.res.event.evenue,
          // fevenue : this.res.event.fevenue,
          date : this.res.event.date,
          description : this.res.event.description,
          // orgname : this.res.event.orgname,
        })
        this.ngxService.stop();
      },
      (error) =>{
        //  console.log(error);
         this.ngxService.stop();
         Swal.fire({
           type: 'error',
           title:'Oops...',
           text:'Something Went Wrong',
         })
        },
      );
  }

  onUpdate(form : NgForm) {
    this.ngxService.start();
    const value = form.value;
    this.serverservice.updateevent(value.ename, value.category, value.evenue, value.fevenue, value.imagePath, 
      value.date, value.orgname, value.description, this.id)
    .subscribe(
      (response) => { 
        console.log(response);
        this.ngxService.stop();
        this.router.navigate(['/myevents']);
      },
      (error) => {
        console.log(error);
        this.ngxService.stop();
        Swal.fire({
          type: 'error',
          title: 'Oops..',
          text: 'Something went wrong',
          showConfirmButton: false,
          timer: 1500,
        })
      },
    );
  }

  onCancel() {
    this.router.navigate(['/discover']);
  }

  back() {
    this.router.navigate(['/myevents']);
  }

}
