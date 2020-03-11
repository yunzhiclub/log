import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LeftnavComponent } from './leftnav/leftnav.component';
import { HeadnavComponent } from './headnav/headnav.component';
import { LoginComponent } from './login/login.component';
import { httpInterceptorProviders } from './interceptor/index-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LeftnavComponent,
    HeadnavComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
