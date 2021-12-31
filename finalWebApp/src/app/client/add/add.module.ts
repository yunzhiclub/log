import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddComponent} from './add.component';



@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule
  ],
  exports: [AddComponent]
})
export class AddModule { }
