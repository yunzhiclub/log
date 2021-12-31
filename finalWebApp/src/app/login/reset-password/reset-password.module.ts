import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResetPasswordComponent} from './reset-password.component';
import {ReactiveFormsModule} from '@angular/forms';

/**
 * 修改密码
 */

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ResetPasswordComponent
  ]
})
export class ResetPasswordModule { }
