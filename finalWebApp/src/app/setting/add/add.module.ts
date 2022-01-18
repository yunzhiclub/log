import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddComponent} from './add.component';
import {ClientSelectModule} from "../../log/client-select/client-select.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    ClientSelectModule,
    ReactiveFormsModule
  ]
})
export class AddModule {
}
