import { Component, OnInit } from '@angular/core';

import { Discover } from './discover.model';
import { ServerService } from '../services/server.service';
import { Router, NavigationEnd } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  selectedEvent : Discover;
  discover: Discover[];
  eventarray:number[]=[];
  ent = false;
  soc = false;
  spo = false;
  tech = false;
  res:any;
  i:number;
  j:number;
  id:number;
  
  needentertainment() {
    this.ent = true;
    this.soc = false;
    this.spo = false;
    this.tech = false;
  }
  needsocial() {
    this.ent = false;
    this.soc = true;
    this.spo = false;
    this.tech = false;
  }
  needsports() {
    this.ent = false;
    this.soc = false;
    this.spo = true;
    this.tech = false;
  }
  needtechnology() {
    this.ent = false;
    this.soc = false;
    this.spo = false;
    this.tech = true;
  }

  constructor(private serverservice: ServerService,
              private route : Router,
              private ngxService: NgxUiLoaderService) { }


  ngOnInit() {
    this.ngxService.start();
    this.serverservice.getCreatedEvents()
    .subscribe(
      (response) =>{
        this.res = response;
        console.log(this.res.events);
        this.discover = this.res.events;
        for(this.i=0; this.i<this.discover.length; this.i++) {
          this.id = this.discover[this.i]._id;
          // console.log(this.id);
          for(this.j=this.i; this.j<this.i+1; this.j++) {
            this.eventarray.push(this.id);
            // console.log(this.eventarray)
          }
        }
        this.ngxService.stop();
      },
      (error) =>{
         console.log(error);
         this.ngxService.stop();
         Swal.fire({
           type: 'error',
           title:'Oops...',
           text:'Server Error',
         })
        },
      );

      this.route.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0);
      });

  }

}