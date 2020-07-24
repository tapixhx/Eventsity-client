import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ServerService {
    body:{};

    private rootUrl = "http://localhost:8080";

    constructor(private http: HttpClient) {}


    signUpUser(name:string,email:string,password:string,cpassword:string) {
        const headers = new HttpHeaders({'Content-Type':'application/json'})
        // console.log(JSON.stringify({name,email,password}));
        return this.http.post(this.rootUrl+'/auth/signup',JSON.stringify({name,email,password,cpassword}),
        {headers: headers});
    }

    logInUser(email:string,password:string) {
        const headers = new HttpHeaders({'Content-Type':'application/json'})
        // console.log(JSON.stringify({name,email,password}));
        return this.http.post(this.rootUrl+'/auth/login',
        JSON.stringify({email,password}),
        {headers: headers});
    }

    createEvent(ename: string,category: string,evenue: string,fevenue: string,imagePath: string, 
        date: string, orgname: string, description: string) {
         const token = localStorage.getItem('token')
         const headers = new HttpHeaders({
           'Content-Type':'application/json',
            'Authorization': `Bearer `+token,
         })
        return this.http.post(this.rootUrl+'/api/register',
            JSON.stringify({ename, category, evenue, imagePath, date, description}),
            {headers: headers});
    }

    getCreatedEvents() {
        return this.http.get(this.rootUrl+'/api/events');
    }

    getEventDetails(id:any) {
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
        })
        return this.http.get(this.rootUrl+'/api/event/'+id,
        {headers: headers});
    }

    getLoggedInUser(): Observable<any> {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer `+token,
        })
        return this.http.get(this.rootUrl+'/auth/login', { headers: headers });
    }

    logallout() {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer `+token,
        })
        return this.http.post(this.rootUrl+'/auth/logoutAll', this.body, { headers: headers });
    }

    deactivateUser(password:string) {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer `+token,
        })
        return this.http.post(this.rootUrl+'/auth/delete', JSON.stringify({password}), 
            { headers: headers }); 
    }

    verifyUser(otp:string, id:any) {
        // console.log(id);
        const headers = new HttpHeaders({'Content-Type':'application/json'})
        return this.http.post(this.rootUrl+'/auth/verify/'+id,
        JSON.stringify({otp}),
        {headers: headers});
    }

    resendOtp(id:any) {
        const headers = new HttpHeaders({'Content-Type':'application/json'})
        return this.http.post(this.rootUrl+'/auth/resend/'+id,
        {headers: headers});
    }

    getMyEvents() {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+token,
        })
        return this.http.get(this.rootUrl+'/api/userevents', { headers: headers });
    }

    getRegisteredEvents() {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+token,
        })
        return this.http.get(this.rootUrl+'/user/registered/upcoming', { headers: headers });
    }

    getEarlierRegisteredEvents() {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+token,
        })
        return this.http.get(this.rootUrl+'/user/registered/visited', { headers: headers }); 
    }

    sendenquiry(enquiry: string, id:any) {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization': `Bearer `+token,
        })
        // console.log(JSON.stringify({enquiry}));
        return this.http.post(this.rootUrl+'/user/enquiry/'+id,JSON.stringify({enquiry}),
        {headers: headers});
    }

    register(name: string, email: string, id:any) {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization': `Bearer `+token,
        })
        // console.log(JSON.stringify({name, email}));
        return this.http.post(this.rootUrl+'/user/register/'+id,JSON.stringify({name, email}),
        {headers: headers});
    }

    deleteEvent(id:any): Observable<any> {
        console.log(id);
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer `+token,
        })
        return this.http.delete(this.rootUrl+'/api/deleteevent/'+id, { headers: headers });
    }

    getEventsforEdit(eventid:any) {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization': `Bearer `+token,
        })
        return this.http.get(this.rootUrl+'/api/update/'+eventid,
        {headers: headers});
    }

    updateevent(ename: string,category: string,evenue: string,fevenue: string,imagePath: string, 
        date: string, orgname: string, description: string, id:any) {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization': `Bearer `+token,
        })
        // console.log(JSON.stringify({ename, category, evenue, fevenue, imagePath, date, orgname, description}));
        return this.http.put(this.rootUrl+'/api/updateevent/'+id,
            JSON.stringify({ename, category, evenue, fevenue, imagePath, date, orgname, description}),
            {headers: headers});
    }

}