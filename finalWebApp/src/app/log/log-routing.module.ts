import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogComponent} from './log.component';

/**
 * 客户端模块路由
 * author: liMingAo
 */
const routs: Routes = [
  {
    path: '',
    component: LogComponent,
    data: {
      title: ''
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routs)],
  exports: [RouterModule]
})
export class LogRoutingModule { }
