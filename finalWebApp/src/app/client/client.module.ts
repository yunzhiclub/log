import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditModule} from './edit/edit.module';
import {AddModule} from './add/add.module';
import {ClientRoutingModule} from './client-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EditModule,
    AddModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
