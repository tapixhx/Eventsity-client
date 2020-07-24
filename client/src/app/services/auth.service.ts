import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable()
export class AuthService {

    constructor(private route:Router) {}

    loggedIn() {
        return !!localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        this.route.navigate(['/']);
        Swal.fire({
            type: 'success',
            title: 'Successfully logged out!!',
            showConfirmButton: false,
            timer: 2000,
        })
    }

    getToken() {
        return localStorage.getItem('token');
    }
}