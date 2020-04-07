import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {PageComponent} from './page/page.component';

@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    PageComponent
  ]
})
export class CoreModule {
}
