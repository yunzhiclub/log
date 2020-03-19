import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LeftnavComponent } from './leftnav/leftnav.component';
import { HeadnavComponent } from './headnav/headnav.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { httpInterceptorProviders } from './interceptor/index-interceptor';

import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { PersonalCenterComponent } from './personal-center/personal-center.component';
import {AuthTokenInterceptor} from './core/auth-token-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LeftnavComponent,
    HeadnavComponent,
    LoginComponent,
    PersonalCenterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    httpInterceptorProviders,
    {provide: HTTP_INTERCEPTORS , useClass: AuthTokenInterceptor , multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
