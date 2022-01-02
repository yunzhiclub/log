import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditComponent} from './edit.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [EditComponent]
})
export class EditModule { }
