import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignInComponent} from './sign-in.component';
import {ReactiveFormsModule} from '@angular/forms';
import {YzSubmitButtonModule} from '@yunzhi/ng-common';

/**
 * 登录
 */

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    YzSubmitButtonModule
  ],
  exports: [
    SignInComponent
  ]
})
export class SignInModule { }
