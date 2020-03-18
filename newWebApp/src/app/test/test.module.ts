import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from '../service/user.service';
import {UserStubService} from './service/user-stub.service';
import { LoginComponent } from './component/login/login.component';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    {provide: UserService, useClass: UserStubService}
  ]
})
export class TestModule { }
