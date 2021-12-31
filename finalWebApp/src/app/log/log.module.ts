import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogComponent } from './log.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';

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
    YzPageModule
  ],
  exports: [
    LogComponent
  ]
})
export class LogModule { }
