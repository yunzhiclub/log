import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PageComponent} from './page/page.component';
import { SizeComponent } from './size/size.component';
import { SelectComponent } from './select/select.component';

@NgModule({
  declarations: [PageComponent, SizeComponent, SelectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    PageComponent,
    SelectComponent
  ]
})
export class CoreModule {
}
