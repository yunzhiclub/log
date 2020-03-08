import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientManageRoutingModule} from './client-manage-routing.module';
import { IndexComponent } from './index/index.component';



@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    ClientManageRoutingModule
  ]
})
export class ClientManageModule { }
