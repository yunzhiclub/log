/**
 *  后台日志管理模块 刘宇轩
 */

import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {BackgroundRoutingMoudle} from './background-routing.moudle';
import {IndexComponent} from './index/index.component';
import {httpInterceptorProviders} from '../interceptor/index-interceptor';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    BackgroundRoutingMoudle,
    HttpClientModule,
  ],
  providers: [
    httpInterceptorProviders,
  ],
})
export class BackgroundModule {}

