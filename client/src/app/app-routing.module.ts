import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';

import { CreateComponent } from './create/create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { DiscoverDetailsComponent } from './discover-details/discover-details.component';
import { AuthGuard } from './guard/auth.guard';
import { VerificationComponent } from './verification/verification.component';
import { MyeventsComponent } from './myevents/myevents.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { RegistrationformComponent } from './registrationform/registrationform.component';
import { EditeventComponent } from './editevent/editevent.component';
import { DeactivateaccountComponent } from './deactivateaccount/deactivateaccount.component';





const routes: Routes = [
   { path:'', component: HomeComponent },
   { path:'discover', component: DiscoverComponent },
   { path:'discover/:id', component: DiscoverDetailsComponent },
   { path:'enquiry/:id', component: EnquiryComponent },
   { path:'register/:id', component: RegistrationformComponent },
   { path:'editevent/:id', component: EditeventComponent },
   { path:'create', component: CreateComponent, canActivate: [AuthGuard] },
   { path:'login', component: LoginComponent },
   { path:'signup', component: SignupComponent },
   { path:'verify/:id', component:VerificationComponent },
   { path:'myevents', component:MyeventsComponent, canActivate: [AuthGuard] },
   { path:'deactivate', component: DeactivateaccountComponent, canActivate: [AuthGuard] },
   { path:'aboutus', component: AboutusComponent },
   { path:'contactus', component: ContactusComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
