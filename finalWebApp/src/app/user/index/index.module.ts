import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index.component';
import {ReactiveFormsModule} from '@angular/forms';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {RouterModule} from '@angular/router';

/**
 * 用户管理首页
 */

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    YzSizeModule,
    YzPageModule,
    RouterModule,

  ],
  exports: [
    IndexComponent
  ]
})
export class IndexModule {
}
