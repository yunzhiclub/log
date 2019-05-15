import { Injectable } from '@angular/core';
import { AppTobarService } from '../share/app.tobar.service';

@Injectable({
    providedIn: 'root',
})
export class TobarService extends AppTobarService {


    getTobar(): any[] {
        return [
            {
                title: '个人中心',
                class: 'fa fa-fw fa-user',
                onclickFn: () => {
                    this.router.navigateByUrl('/main/personal');
                }
            },
            {
                title: '注销',
                class: 'fa fa-fw fa-sign-out',
                onclickFn: () => {
                    // this.departmentService.loginOut();
                }
            },
        ];
    }
}
