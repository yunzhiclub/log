import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientSelectComponent} from './client-select.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ClientSelectComponent
  ],
  exports: [
    ClientSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ClientSelectModule {
}
