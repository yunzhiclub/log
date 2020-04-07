import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import {HttpClientModule} from '@angular/common/http';
import {UserRoutingModule} from './user-routing.module';
import {AppModule} from '../app.module';
import {CoreModule} from '../core/core.module';



@NgModule({
  declarations: [IndexComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    UserRoutingModule,
    CoreModule
  ]
})
export class UserModule { }
