import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatePipe} from "./state.pipe";


@NgModule({
  declarations: [
    StatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StatePipe
  ]
})
export class StatePipeModule {
}
