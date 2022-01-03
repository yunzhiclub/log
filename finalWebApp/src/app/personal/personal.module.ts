import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalComponent } from './personal.component';
import {PersonalRoutingModule} from './personal-routing.module';

/**
 * 个人中心模块
 */

@NgModule({
  declarations: [
    PersonalComponent
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule
  ],
  exports: [
    PersonalComponent
  ]
})
export class PersonalModule { }
