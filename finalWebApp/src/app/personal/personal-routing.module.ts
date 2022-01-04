import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PersonalComponent} from './personal.component';
import {ModifyPasswordComponent} from './modify-password/modify-password.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalComponent,
    data: {
      title: '个人中心'
    }
  },
  {
    path: 'modifyPassword',
    component: ModifyPasswordComponent,
    data: {
      title: '修改密码'
    }
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule {
}
