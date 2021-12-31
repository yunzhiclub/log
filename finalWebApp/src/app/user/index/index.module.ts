import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IndexComponent} from './index.component';
import {RouterModule} from '@angular/router';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {ReactiveFormsModule} from '@angular/forms';

/**
 * 用户管理首页
 */

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    RouterModule,
    YzSizeModule,
    YzPageModule,
    ReactiveFormsModule
  ],
  exports: [
    IndexComponent
  ]
})
export class IndexModule { }
