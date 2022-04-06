import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DingSelectModule} from '../ding-select/ding-select.module';

/**
 * 系统设置
 */

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DingSelectModule,
  ],
  exports: [
    IndexComponent
  ]
})
export class IndexModule {
}
