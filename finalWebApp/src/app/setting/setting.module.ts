import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingRoutingModule} from './setting-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AddModule} from "./add/add.module";
import {IndexModule} from "./index/index.module";
import {EditModule} from "./edit/edit.module";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ReactiveFormsModule,
    AddModule,
    IndexModule,
    EditModule
  ]
})
export class SettingModule { }
