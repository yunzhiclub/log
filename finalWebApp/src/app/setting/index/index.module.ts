import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import {ReactiveFormsModule} from "@angular/forms";
import {YzPageModule, YzSizeModule} from "@yunzhi/ng-common";
import {ClientSelectModule} from "../../log/client-select/client-select.module";
import {RouterModule} from "@angular/router";
import {PipeModule} from "../pipe/pipe.module";
import {StatePipeModule} from "../../client/state/state,pipe.module";

/**
 * 机器人管理首页
 */

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    YzSizeModule,
    YzPageModule,
    ClientSelectModule,
    RouterModule,
    PipeModule,
    StatePipeModule
  ],
  exports: [
    IndexComponent
  ]
})
export class IndexModule { }
