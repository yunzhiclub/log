import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LoginRoutingModule} from './login-routing.module';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignInModule} from './sign-in/sign-in.module';
import {YzSubmitButtonModule} from '@yunzhi/ng-common';

/**
 * 登录页面
 * @author weiweiyi
 */

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginRoutingModule,
    SignInModule
  ],
  exports: [
    LoginComponent,
  ]
})
export class LoginModule { }
