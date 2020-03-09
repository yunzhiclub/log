import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientManageRoutingModule} from './client-manage-routing.module';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [IndexComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    ClientManageRoutingModule
  ]
})
export class ClientManageModule { }
