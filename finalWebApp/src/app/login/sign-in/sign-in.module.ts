import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignInComponent} from './sign-in.component';
import {ReactiveFormsModule} from '@angular/forms';

/**
 * 登录
 */

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SignInComponent
  ]
})
export class SignInModule { }
