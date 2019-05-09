import { AppMenuService } from '../share/app.menu.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MenuService extends AppMenuService {
    getModels(): any[] {
        return [
            {
                label: '首页',
                link: '/dashboard',
                icon: 'fa fa-fw fa-home',
            },
            {
                label: '后台日志管理',
                icon: 'fa fa-fw fa-book',
                routerLink: '/log-background',
            },
            {
                label: '前台日志管理',
                icon: 'pi pi-calendar-plus',
                routerLink: '/log-front',
            },
            {
                label: '客户端管理',
                routerLink: '/client',
            },
            {
                label: '系统设置',
                icon: 'fa fa-fw fa-user',
                routerLink: '/system',
            },
        ];
    }
}
