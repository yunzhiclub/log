import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {CacheService} from '../service/cache.service';
import {UserService} from '../service/user.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('拦截到请求信息。请求地址：' + req.url + '; 请求方法：' + req.method);
    const reqClone = req.clone({
      setHeaders: {'auth-token': CacheService.getAuthToken()}
    });
    return next.handle(reqClone).pipe(map((httpEvent) => {
      if (httpEvent instanceof HttpResponse) {
        const httpResponse = httpEvent as HttpResponse<any>;
        const authToken = httpResponse.headers.get('auth-token');
        console.log('获取到的authToken为' + authToken);
        CacheService.setAuthToken(authToken);
      }

      return httpEvent;
    }), tap(() => {}, (event: HttpErrorResponse) => {
      if (event.status === 401) {
        this.userService.setIsLogin(false);
      }
    }));
  }
}
