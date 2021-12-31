import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {IndexComponent} from './index/index.component';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {ReactiveFormsModule} from '@angular/forms';
import {EditModule} from './edit/edit.module';
import {AddModule} from './add/add.module';

/**
 * 用户管理
 */

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    YzSizeModule,
    ReactiveFormsModule,
    YzPageModule,
    EditModule,
    AddModule
  ]
})
export class UserModule {
}
