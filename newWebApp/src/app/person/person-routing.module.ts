import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ModifyPasswordComponent} from './modify-password/modify-password.component';
import {PersonalCenterComponent} from './personal-center/personal-center.component';


const routes: Routes = [
  {
    path: '',
    component: PersonalCenterComponent,
    data: {
      title: '首页'
    }
  },
  {
    path: 'modifyPassword',
    component: ModifyPasswordComponent,
    data: {
      title: '修改密码'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule {
}
