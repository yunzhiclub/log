import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PageComponent} from './page/page.component';
import { SelectComponent } from './select/select.component';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from '../interceptor/auth-interceptor.service';
import {httpInterceptorProviders} from '../interceptor/index-interceptor';
import {AuthTokenInterceptor} from './auth-token-interceptor';

import { SizeComponent } from './size/size.component';

@NgModule({
  declarations: [PageComponent, SizeComponent, SelectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    PageComponent,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    SelectComponent
  ],
  providers: [
    httpInterceptorProviders,
    {provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true}
  ]
})
export class CoreModule {
}
