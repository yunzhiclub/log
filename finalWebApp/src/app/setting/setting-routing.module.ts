import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SettingComponent} from './setting.component';
import {IndexComponent} from "./index/index.component";
import {AddComponent} from "./add/add.component";


const routes: Routes = [
  {
    path: '',
    data: {
      title: ''
    },
    component: IndexComponent
  },
  {
    path: 'add',
    data: {
      title: '新增机器人'
    },
    component: AddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
