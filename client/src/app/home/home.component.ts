import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  t = false;
  constructor(private authservice : AuthService) { }

  ngOnInit() {
    if(this.authservice.loggedIn()) {
      if(!this.t)
      setTimeout(()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('name');
      }, 21600000);
      this.t = true;
    }
  }

}