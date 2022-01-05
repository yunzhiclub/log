import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogComponent } from './log.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {LogRoutingModule} from './log-routing.module';

/**
 * 日志管理
 */


@NgModule({
  declarations: [
    LogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    YzSizeModule,
    YzPageModule,
    LogRoutingModule
  ],
  exports: [
    LogComponent
  ]
})
export class LogModule { }
