import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ClientSelectModule} from "../../log/client-select/client-select.module";

/**
 * 机器人管理编辑
 */

@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientSelectModule
  ],
  exports: [
    EditComponent
  ]
})
export class EditModule { }
