import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {AddComponent} from "./add/add.component";
import {EditComponent} from "./edit/edit.component";


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
  },
  {
    path: 'edit/:id',
    data: {
      title: '编辑机器人'
    },
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
