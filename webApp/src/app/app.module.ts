import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LoginComponent } from './pages/login/login.component';
import { MainModule } from './pages/main/main.module';

// 模块声明:

registerLocaleData(zh);

@NgModule({
  // 声明自己的拥有的组件：即本模块是由哪几个组件组成的
  declarations: [
    AppComponent,
    LoginComponent
  ],
  // 声明需要的第三方模块
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    MainModule
  ],
  // 声明provider
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  // 声明启动组件
  bootstrap: [AppComponent]
})
export class AppModule { }
