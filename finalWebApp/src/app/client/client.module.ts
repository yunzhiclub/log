import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditModule} from './edit/edit.module';
import {AddModule} from './add/add.module';
import {ClientRoutingModule} from './client-routing.module';
import {IndexComponent} from './index/index.component';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StatePipeModule} from "./state/state,pipe.module";
import {TokenShowModule} from "./token-show/token-show.module";



@NgModule({
  declarations: [IndexComponent],
    imports: [
        CommonModule,
        EditModule,
        AddModule,
        ClientRoutingModule,
        YzSizeModule,
        YzPageModule,
        ReactiveFormsModule,
        FormsModule,
        StatePipeModule,
        TokenShowModule
    ]
})
export class ClientModule { }
