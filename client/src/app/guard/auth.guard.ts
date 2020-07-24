import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authservice: AuthService,
              private route: Router) {}

  canActivate(): boolean {
    if(this.authservice.loggedIn()) {
      return true;
    } else {
      this.route.navigate(['/login']);
      return false;
    }
  }
  
}
