import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IndexModule} from './index/index.module';
import {SystemSettingRoutingModule} from './system-setting-routing.module';

/**
 * 系统设置
 */

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    IndexModule,
    SystemSettingRoutingModule
  ]
})
export class SystemSettingModule { }
