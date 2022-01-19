import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import {SettingRoutingModule} from './setting-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {IndexComponent} from "./index/index.component";
import {AddModule} from "./add/add.module";
import {IndexModule} from "./index/index.module";



@NgModule({
  declarations: [
    SettingComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ReactiveFormsModule,
    AddModule,
    IndexModule
  ]
})
export class SettingModule { }
