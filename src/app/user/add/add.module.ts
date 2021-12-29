import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add.component';

/**
 * 用户管理新增
 */

@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AddComponent
  ]
})

export class AddModule { }
