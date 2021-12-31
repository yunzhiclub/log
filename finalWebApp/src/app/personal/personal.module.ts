import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalComponent } from './personal.component';

/**
 * 个人中心模块
 */

@NgModule({
  declarations: [
    PersonalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PersonalComponent
  ]
})
export class PersonalModule { }
