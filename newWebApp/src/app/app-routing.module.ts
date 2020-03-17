import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



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
    path: 'user',
    loadChildren: () => import('./user/user.module').then(mod => mod.UserModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
