import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignInComponent} from './sign-in.component';

/**
 * 登录
 */

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SignInComponent
  ]
})
export class SignInModule { }
