import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index.component';

/**
 * 用户管理首页
 */

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule
  ],
  exports: [
    IndexComponent
  ]
})
export class IndexModule {
}
