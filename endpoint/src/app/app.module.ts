import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginFormComponent } from './components/login/login-form.component';
import { RegisterFormComponent } from './components/register/register-form.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DataService } from './core/data.service';
import { HttpClientModule } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContentTypeHeaderInterceptor } from "./content-type-header.interceptor";
import { Subscription } from 'rxjs/Subscription';
import { DisplayService } from './core/display.service';
import { ErrorService } from './core/error.service';
import { ApiService } from './core/api.service';
//import { CookieService } from 'ng2-cookies';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'landing-page', component: LandingPageComponent }
]; 

@NgModule({
  declarations: [
    AppComponent, HomePageComponent, LoginFormComponent, RegisterFormComponent, LandingPageComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes), FormsModule, HttpClientModule
  ],
  providers: [ DataService, DisplayService, ApiService, ErrorService,// CookieService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ContentTypeHeaderInterceptor,
        multi: true
    }  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
