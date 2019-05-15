import {Injectable, Injector, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {zip} from 'rxjs';
import {catchError} from 'rxjs/operators';


/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
    constructor(
        private httpClient: HttpClient,
        private injector: Injector,
    ) {
    }

    private viaHttp(resolve: any, reject: any) {
        zip(
            this.httpClient.get('assets/tmp/app-data.json'),
        ).pipe(
            // 接收其他拦截器后产生的异常消息
            catchError(([appData]) => {
                resolve(null);
                return [appData];
            }),
        ).subscribe(([appData]) => {

                // application data
                const res: any = appData;
            },
            () => {
            },
            () => {
                resolve(null);
            });
    }

    private viaMock(resolve: any, reject: any) {
        // const tokenData = this.tokenService.get();
        // if (!tokenData.token) {
        //   this.injector.get(Router).navigateByUrl('/passport/login');
        //   resolve({});
        //   return;
        // }
        // mock
        const app: any = {
            name: `ng-alain`,
            description: `Ng-zorro admin panel front-end framework`,
        };
        const user: any = {
            name: 'Admin',
            avatar: './assets/tmp/img/avatar.jpg',
            email: 'cipchk@qq.com',
            token: '123456789',
        };
        const menu1 = [
            {
                text: '主导航',
                group: true,
                children: [
                    {
                        text: '首页',
                        link: '/dashboard',
                        icon: {type: 'icon', value: 'appstore'},
                    },
                    {
                        text: '后台日志管理',
                        icon: {type: 'icon', value: 'rocket'},
                        link: '/log-background',
                    },
                    {
                        text: '前台日志管理',
                        icon: {type: 'icon', value: 'ellipsis'},
                        link: '/log-front',
                    },
                    {
                        text: '客户端管理',
                        icon: {type: 'icon', value: 'rocket'},
                        link: '/client',
                    },
                    {
                        text: '系统设置',
                        icon: {type: 'icon', value: 'link'},
                        link: '/system',
                    }
                ],
            },
        ];

        resolve({});
    }

    load(): Promise<any> {
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise((resolve, reject) => {
            // http
            // this.viaHttp(resolve, reject);
            // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
            this.viaMock(resolve, reject);

        });
    }
}
