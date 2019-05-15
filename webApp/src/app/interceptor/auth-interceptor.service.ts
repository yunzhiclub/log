import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

/**
 * 认证拦截器
 * panjie
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    // constructor(private departmentService: DepartmentService) {}

    /**
     * 方法实现
     * 拦截请求：req
     * 拦截响应: next.handler(req).pip(tap((next) => {}, (error) => {}));
     * pip 与 subscribe的使用请求.
     * pip(map)别人订阅后，我来过滤。用于并不想马上触发订阅方法，但却要对订阅后产生的数据过滤的情景。
     * subscribe 订阅后，立即发送数据流
     * @param req 请求
     * @param next 下一个处理者
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(tap(() => {
            }, (error) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        // this.departmentService.notify(false);
                    }
                }
            }));
    }
}
