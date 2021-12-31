import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddComponent} from './add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

/**
 * 用户管理新增
 */

@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    AddComponent
  ]
})
export class AddModule {
}
