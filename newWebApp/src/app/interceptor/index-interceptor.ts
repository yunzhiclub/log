import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './auth-interceptor.service';
import {RequestInterceptor} from './request-interceptor.service';

export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}
];
