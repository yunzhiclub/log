import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoadingInterceptor} from "../intercepter/LoadingInterceptor";
import {ApiPrefixAndMergeMapInterceptor} from "../intercepter/api-prefix-and-merge-map.interceptor";
import {NullOrUndefinedOrEmptyInterceptor} from "../intercepter/null-or-undefined-or-empty.interceptor";
import {XAuthTokenInterceptor} from "../intercepter/x-auth-token.interceptor";
import {Prevent401Popup} from "@yunzhi/ng-common";

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiPrefixAndMergeMapInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: NullOrUndefinedOrEmptyInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: XAuthTokenInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: Prevent401Popup,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  }],
})
export class ApiProModule {
}
