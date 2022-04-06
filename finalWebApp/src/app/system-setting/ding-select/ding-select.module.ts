import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DingSelectComponent } from './ding-select.component';
import {ReactiveFormsModule} from '@angular/forms';

/**
 * 钉钉选择组件
 */

@NgModule({
  declarations: [
    DingSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    DingSelectComponent
  ]
})
export class DingSelectModule { }
