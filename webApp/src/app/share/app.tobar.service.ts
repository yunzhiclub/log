import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AppTobarService {

    constructor(public router: Router) {
    }

    public $tobars = new BehaviorSubject([
        {
            title: 'Profile',
            class: 'fa fa-fw fa-user',
            onclickFn: () => {
            }
        },
        {
            title: 'Privacy',
            class: 'fa fa-fw fa-user-secret',
            onclickFn: () => {
            }
        },
        {
            title: 'Settings',
            class: 'fa fa-fw fa-cog',
            onclickFn: () => {
            }
        },
        {
            title: 'Logout',
            class: 'fa fa-fw fa-sign-out',
            onclickFn: () => {
            }
        },
    ]);
}
