import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';


/**
 * 客户端模块路由
 * author: liMingAo
 */
const routs: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: {
      title: ''
    }
  },
  {
    path: 'add',
    component: AddComponent,
    data: {
      title: '新增'
    }
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    data: {
      title: '编辑'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routs)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
