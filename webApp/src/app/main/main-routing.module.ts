import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import {IndexComponent} from './index/index.component';
import {BackgroudComponent} from './backgroud/backgroud.component';
import {ClientComponent} from './client/client.component';

/**
 * 定制main模块路由信息
 */
const routes: Routes = [
    {
        path: 'main',
        component: MainComponent,
        children: [
            {
                path: '',
                component: IndexComponent,
            },
            {
                path: 'dashboard',
                component: IndexComponent
            },
            {
                path: 'background',
                component: BackgroudComponent
            },
            {
                path: 'client',
                component: ClientComponent
            }
        ],
    },
];

/**
 * 主页面路由模块
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class    MainRoutingModule {
}
