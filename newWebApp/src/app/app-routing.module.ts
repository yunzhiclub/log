import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PersonalCenterComponent} from './personal-center/personal-center.component';



const routes: Routes = [
  {
    path: 'client',
    loadChildren: () => import('./client-manage/client-manage.module').then(mod => mod.ClientManageModule)
  },
  {
    path: 'background',
    loadChildren: () => import('./background/background.module').then(mod => mod.BackgroundModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then(mod => mod.SettingModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(mod => mod.UserModule)
  },
  {
    path: 'personalCenter',
    component: PersonalCenterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
