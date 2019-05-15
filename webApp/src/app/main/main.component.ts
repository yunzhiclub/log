import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {CallbackFunction} from '../interface/CallbackFunction';
import {AppMenuService} from '../share/app.menu.service';
import {MenuService} from './menu.service';
import {AppTobarService} from '../share/app.tobar.service';
import {TobarService} from '../main/tobar.service';
import {UserService} from '../core/service/user.service';
import {User} from '../core/entity/User';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.less'],
})
export class MainComponent implements OnDestroy, OnInit {
    @ViewChild('successSwal') public successSwal: SwalComponent; // 定义 successSwal 弹窗。
    showLogin = true;
    showMain = false;
    alertOption = null;

    constructor(
        private userService: UserService,
        private appMenuService: AppMenuService,
        private menuService: MenuService,
        private appTobarService: AppTobarService,
        private tobarService: TobarService
    ) {
        console.log('前台初始化');
        appMenuService.$models.next(menuService.getModels());
        this.alertOption = {
            title: 'Are you sure?',
            text: 'Do you want to save changes',
            type: 'success',
            showCancelButton: false,
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            cancelButtonColor: '#d33',
        };
    }

    ngOnInit() {

        // 初始化顶部菜单
        this.appTobarService.$tobars.next(this.tobarService.getTobar());

        this.userService.loginUser$.subscribe((user: User) => {
                if (user != null) {
                    this.showLogin = false;
                    this.showMain = true;
                } else {
                    this.showLogin = true;
                    this.showMain = false;
                }
            }
        );
    }

    ngOnDestroy(): void {
    }

    /**
     * 成功弹窗
     * https://github.com/sweetalert2/ngx-sweetalert2
     * @param title 标题
     * @param description 描述信息
     * @param callback 回调
     */
    public success(
        title = '操作成功',
        description = '',
        callback?: CallbackFunction,
    ): void {
        this.successSwal.options = {
            title: title,
            text: description,
            type: 'success',
            confirmButtonText: '确定',
        };
        this.swalConfirm = (event: boolean) => {
            if (callback) {
                callback(event);
            }
        };
        this.successSwal.show();
    }

    /**
     * 失败弹窗
     * https://github.com/sweetalert2/ngx-sweetalert2
     * @param title 标题
     * @param description 描述信息
     * @param callback 回调
     */
    public error(
        title = '操作失败',
        description = '',
        callback?: CallbackFunction,
    ): void {
        this.successSwal.options = {
            title: title,
            text: description,
            type: 'error',
            confirmButtonText: '确定',
        };
        this.swalConfirm = (event: boolean) => {
            if (callback) {
                callback(event);
            }
        };
        this.successSwal.show();
    }

    public swalConfirm(event: boolean): void {
        console.log(event);
    }

    public swalCancel(event: boolean): void {
        console.log(event);
    }

    /**
     * 确定弹窗
     * https://github.com/sweetalert2/ngx-sweetalert2
     * 项目演示  https://sweetalert2.github.io/
     * @param title 标题
     * @param description 描述信息
     * @param callback 回调
     */
    public confirm(
        title = '',
        description = '',
        callback?: CallbackFunction,
    ): void {
        this.alertOption = {
            title: title,
            text: description,
            type: 'warning',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            showCancelButton: true,
            cancelButtonColor: '#d33',
        };
        this.successSwal.options = this.alertOption;
        this.swalConfirm = (event: boolean) => {
            if (callback) {
                callback(event);
            }
        };
        this.swalCancel = () => {
            console.log(false);
        };
        this.successSwal.show();
    }
}
