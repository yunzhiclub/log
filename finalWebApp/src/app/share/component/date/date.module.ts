import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DateComponent} from './date.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

/**
 * 日期模块
 */
@NgModule({
  declarations: [
    DateComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
  exports: [
    DateComponent
  ]
})
export class DateModule {
}
