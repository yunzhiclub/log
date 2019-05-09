import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

/**
 * 定制main模块路由信息
 */
const routes: Routes = [
    {
        path: 'main',
        component: MainComponent,
        children: [
            // {
            //     path: '',
            //     component: CheckRecordIndexComponent,
            // }
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
