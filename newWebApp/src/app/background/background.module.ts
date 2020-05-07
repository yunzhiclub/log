/**
 *  后台日志管理模块 刘宇轩
 */

import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {BackgroundRoutingMoudle} from './background-routing.moudle';
import {IndexComponent} from './index/index.component';
import {CoreModule} from '../core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ClientSelectComponent } from './client-select/client-select.component';

@NgModule({
  declarations: [IndexComponent, ClientSelectComponent],
    imports: [
        CommonModule,
        BackgroundRoutingMoudle,
        CoreModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class BackgroundModule {}

