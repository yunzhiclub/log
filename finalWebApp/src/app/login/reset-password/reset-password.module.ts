import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResetPasswordComponent} from './reset-password.component';
import {ReactiveFormsModule} from '@angular/forms';



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
