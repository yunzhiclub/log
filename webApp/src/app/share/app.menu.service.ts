import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AppMenuService {
    public $models = new BehaviorSubject([
        {
            label: 'Components',
            icon: 'fa fa-fw fa-sitemap',
            items: [
                {
                    label: 'Sample Page',
                    icon: 'fa fa-fw fa-columns',
                    routerLink: ['/sample'],
                },
                {
                    label: 'Forms',
                    icon: 'fa fa-fw fa-code',
                    routerLink: ['/forms'],
                },
                {
                    label: 'Data',
                    icon: 'fa fa-fw fa-table',
                    routerLink: ['/data'],
                },
                {
                    label: 'Panels',
                    icon: 'fa fa-fw fa-list-alt',
                    routerLink: ['/panels'],
                },
                {
                    label: 'Overlays',
                    icon: 'fa fa-fw fa-square',
                    routerLink: ['/overlays'],
                },
                {
                    label: 'Menus',
                    icon: 'fa fa-fw fa-minus-square-o',
                    routerLink: ['/menus'],
                },
                {
                    label: 'Messages',
                    icon: 'fa fa-fw fa-circle-o-notch',
                    routerLink: ['/messages'],
                },
                {
                    label: 'Charts',
                    icon: 'fa fa-fw fa-area-chart',
                    routerLink: ['/charts'],
                },
                {
                    label: 'File',
                    icon: 'fa fa-fw fa-arrow-circle-o-up',
                    routerLink: ['/file'],
                },
                {
                    label: 'Misc',
                    icon: 'fa fa-fw fa-user-secret',
                    routerLink: ['/misc'],
                },
            ],
        },
        {
            label: 'Template Pages',
            icon: 'fa fa-fw fa-life-saver',
            items: [
                {
                    label: 'Empty Page',
                    icon: 'fa fa-fw fa-square-o',
                    routerLink: ['/empty'],
                },
                {
                    label: 'Landing Page',
                    icon: 'fa fa-fw fa-certificate',
                    url: 'assets/pages/landing.html',
                    target: '_blank',
                },
                {
                    label: 'Login Page',
                    icon: 'fa fa-fw fa-sign-in',
                    url: 'assets/pages/login.html',
                    target: '_blank',
                },
                {
                    label: 'Error Page',
                    icon: 'fa fa-fw fa-exclamation-circle',
                    url: 'assets/pages/error.html',
                    target: '_blank',
                },
                {
                    label: 'Not Found Page',
                    icon: 'fa fa-fw fa-times',
                    url: 'assets/pages/notfound.html',
                    target: '_blank',
                },
                {
                    label: 'Access Denied Page',
                    icon: 'fa fa-fw fa-exclamation-triangle',
                    url: 'assets/pages/access.html',
                    target: '_blank',
                },
            ],
        },
        {
            label: 'Menu Hierarchy',
            icon: 'fa fa-fw fa-gg',
            items: [
                {
                    label: 'Submenu 1',
                    icon: 'fa fa-fw fa-sign-in',
                    items: [
                        {
                            label: 'Submenu 1.1',
                            icon: 'fa fa-fw fa-sign-in',
                            items: [
                                {
                                    label: 'Submenu 1.1.1',
                                    icon: 'fa fa-fw fa-sign-in',
                                },
                                {
                                    label: 'Submenu 1.1.2',
                                    icon: 'fa fa-fw fa-sign-in',
                                },
                                {
                                    label: 'Submenu 1.1.3',
                                    icon: 'fa fa-fw fa-sign-in',
                                },
                            ],
                        },
                        {
                            label: 'Submenu 1.2',
                            icon: 'fa fa-fw fa-sign-in',
                            items: [
                                {
                                    label: 'Submenu 1.2.1',
                                    icon: 'fa fa-fw fa-sign-in',
                                },
                                {
                                    label: 'Submenu 1.2.2',
                                    icon: 'fa fa-fw fa-sign-in',
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Submenu 2',
                    icon: 'fa fa-fw fa-sign-in',
                    items: [
                        {
                            label: 'Submenu 2.1',
                            icon: 'fa fa-fw fa-sign-in',
                            items: [
                                {
                                    label: 'Submenu 2.1.1',
                                    icon: 'fa fa-fw fa-sign-in',
                                },
                                {
                                    label: 'Submenu 2.1.2',
                                    icon: 'fa fa-fw fa-sign-in',
                                },
                                {
                                    label: 'Submenu 2.1.3',
                                    icon: 'fa fa-fw fa-sign-in',
                                },
                            ],
                        },
                        {
                            label: 'Submenu 2.2',
                            icon: 'fa fa-fw fa-sign-in',
                            items: [
                                {
                                    label: 'Submenu 2.2.1',
                                    icon: 'fa fa-fw fa-sign-in',
                                },
                                {
                                    label: 'Submenu 2.2.2',
                                    icon: 'fa fa-fw fa-sign-in',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            label: 'Utils',
            icon: 'fa fa-fw fa-wrench',
            routerLink: ['/utils'],
        },
        {
            label: 'Documentation',
            icon: 'fa fa-fw fa-book',
            routerLink: ['/documentation'],
        },
    ]);
}
