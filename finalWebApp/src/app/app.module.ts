import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BasicModule} from '@yunzhi/ng-theme';
import {ThemeService} from '../service/theme.service';
import {ApiDemoModule} from '../api/api.demo.module';
import {ApiProModule} from "../api/api.pro.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BasicModule.forRoot({
      basicService: ThemeService
    }),
    // ApiDemoModule
    ApiProModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
