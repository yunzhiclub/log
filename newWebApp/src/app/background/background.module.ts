/**
 *  后台日志管理模块 刘宇轩
 */

import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {BackgroundRoutingMoudle} from './background-routing.moudle';
import {IndexComponent} from './index/index.component';
import {CoreModule} from '../core/core.module';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    BackgroundRoutingMoudle,
    CoreModule,
  ]
})
export class BackgroundModule {}

