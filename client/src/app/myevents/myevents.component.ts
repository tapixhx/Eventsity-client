import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Discover } from '../discover/discover.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { Router, NavigationEnd } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.component.html',
  styleUrls: ['./myevents.component.css']
})
export class MyeventsComponent implements OnInit {
  uname:string;
  res:any;
  reg:any;
  ereg:any;
  discover : Discover[];
  public registered : [];
  public earlierregistered : [];
  i:number;
  j:number;
  id:number;
  eventarray:number[]=[];
  activity = false;

  constructor(private serverservice : ServerService,
              private ngxService: NgxUiLoaderService,
              private router : Router) { }

  ngOnInit() {
  this.uname=localStorage.getItem('name');

  this.ngxService.start();

  this.router.events.subscribe((evt) => {
    if (!(evt instanceof NavigationEnd)) {
        return;
    }
    window.scrollTo(0, 0);
  });

  this.serverservice.getMyEvents()
    .subscribe(
      (response) =>{
        this.res = response;
        console.log(this.res);
        this.ngxService.stop();
        this.discover = this.res.events;
        for(this.i=0; this.i<this.discover.length; this.i++) {
          this.id = this.discover[this.i]._id;
          // console.log(this.id);
          for(this.j=this.i; this.j<this.i+1; this.j++) {
            this.eventarray.push(this.id);
            // console.log(this.eventarray)
          }
        }
      },
      (error : HttpErrorResponse) =>{ 
        console.log(error);
        if(error.error.message === "Not authenticated.") {
          localStorage.removeItem('token');
          localStorage.removeItem('name');
          Swal.fire({
            type:'error',
            title:'Not Authenticated',
            text: 'LogIn again to continue',
            showConfirmButton:false,
            timer:1500,
          })  
          this.router.navigate(['/']);
        }
        this.ngxService.stop();
        if(error.error.message != 'Not authenticated.') {
        Swal.fire({
          type:'error',
          title:'Oops...',
          text: 'Something Went Wrong',
          showConfirmButton:false,
          timer:1500,
        })
      }
      },
      );

  // this.serverservice.getRegisteredEvents()
  // .subscribe(
  //   (response) =>{
  //     this.reg = response;
  //     // console.log(this.reg.event);
  //     this.registered = this.reg.event;
  //     this.ngxService.stop();
  //     // console.log(this.res.event.id);
  //     // this.discoverservice.setRegisteredEvents(this.registered);
  //     // console.log(this.discover);
  //   },
  //   (error) =>{ 
  //     console.log(error);
  //     this.ngxService.stop();
  //     Swal.fire({
  //       type:'error',
  //       title:'Oops...',
  //       text: 'Something Went Wrong',
  //     })
  //   },
  // )

  // this.serverservice.getEarlierRegisteredEvents()
  // .subscribe(
  //   (response) =>{
  //     this.ereg = response;
  //     // console.log(this.reg.event);
  //     this.earlierregistered = this.ereg.event;
  //     this.ngxService.stop();
  //     // console.log(this.res.event.id);
  //     // this.discoverservice.setRegisteredEvents(this.registered);
  //     // console.log(this.discover);
  //   },
  //   (error) =>{ 
  //     console.log(error);
  //     this.ngxService.stop();
  //     Swal.fire({
  //       type:'error',
  //       title:'Oops...',
  //       text: 'Something Went Wrong',
  //     })
  //   },
  // ) 
  
  }

  onShowActivity() {
    this.activity = true;
  }

  hideActivity() {
    this.activity = false;
  }

  onDelete(eventid:any) {
    Swal.fire({
      type:'warning',
      title:'Are you sure!!',
      showCancelButton:true,
      cancelButtonColor:'red',
      confirmButtonText:'Yes, delete it',
    }).then((onConfirmDelete)=>{
      if(onConfirmDelete.value) {
        this.onConfirmDelete(eventid);
      }
    })
  }

  onConfirmDelete(eventid:any) {
    this.ngxService.start();
    console.log(eventid);
    this.serverservice.deleteEvent(eventid)
    .subscribe(
      (response) =>{
        console.log(response);
        this.ngxService.stop();
        Swal.fire({
          type:'success',
          title: 'Event Deleted',
          showConfirmButton: false,
          timer: 1500,
        })
        this.router.navigate(['/discover']);
      },
      (error) =>{
        console.log(error);
        this.ngxService.stop();
        Swal.fire({
          type: 'error',
          title: 'Not Authenticated To Delete',
          showConfirmButton: false,
          timer: 1500,
        })
      },
    )
  }

  logOutfromall() {
    Swal.fire({
      type:'warning',
      title:'Are you sure!!',
      showCancelButton:true,
      cancelButtonColor:'red',
      confirmButtonText:'LogOut from all Devices',
    }).then((onConfirmDelete)=>{
      if(onConfirmDelete.value) {
        this.onConfirmLogoutall();
      }
    })
  }

  onConfirmLogoutall() {
    this.ngxService.start();
    this.serverservice.logallout()
    .subscribe(
      (response) =>{
        console.log(response);
        this.ngxService.stop();
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        this.router.navigate(['/']);
        Swal.fire({
          type:'success',
          title:'Successfully logged out from all devices',
          showConfirmButton:false,
          timer:1500,
        })
      },
      (error) =>{
        console.log(error);
        this.ngxService.stop();
        Swal.fire({
          type:'error',
          title:'Oops....',
          text:'Something went wrong',
          showConfirmButton:false,
          timer:1500,
        })
      },
    )
  }

  wantDeactivate() {
    this.router.navigate(['/deactivate']);
  }

}