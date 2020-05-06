import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientManageRoutingModule} from './client-manage-routing.module';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import {HttpClientModule} from '@angular/common/http';
import {httpInterceptorProviders} from '../interceptor/index-interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserRoutingModule} from '../user/user-routing.module';
import {CoreModule} from '../core/core.module';



@NgModule({
  declarations: [IndexComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    ClientManageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CoreModule
  ],
  providers: [
    httpInterceptorProviders,
  ],
})
export class ClientManageModule { }
