import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { IndexComponent } from './index/index.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [IndexComponent],
    imports: [
        CommonModule,
        SettingRoutingModule,
        ReactiveFormsModule
    ]
})
export class SettingModule { }
