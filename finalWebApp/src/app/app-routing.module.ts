import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BasicComponent} from '@yunzhi/ng-theme';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: '',
    component: BasicComponent,
    children: [
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        data: {
          title: '用户管理'
        }
      },
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
        data: {
          title: '客户端管理'
        }
      },
      {
        path: 'log',
        loadChildren: () => import('./log/log.module').then(m => m.LogModule),
        data: {
          title: '日志管理'
        }
      },{
      path: 'personal',
        loadChildren: () => import('./personal/personal.module').then(m => m.PersonalModule)
      },
      {
        path: 'setting',
        data: {
          title: '系统设置'
        },
        loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
