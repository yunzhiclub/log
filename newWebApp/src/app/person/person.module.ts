import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ModifyPasswordComponent} from './modify-password/modify-password.component';
import {PersonRoutingModule} from './person-routing.module';
import {PersonalCenterComponent} from './personal-center/personal-center.component';

@NgModule({
  declarations: [PersonalCenterComponent, ModifyPasswordComponent],
  imports: [
    CommonModule,
    PersonRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    ModifyPasswordComponent,
    PersonalCenterComponent
  ],
})
export class PersonModule {
}
