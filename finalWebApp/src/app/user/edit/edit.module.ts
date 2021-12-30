import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditComponent} from './edit.component';
import {ReactiveFormsModule} from '@angular/forms';

/**
 * 用户管理编辑
 * author: liMingAo
 */

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

  ],
  exports: [
    EditComponent
  ]
})
export class EditModule {
}
