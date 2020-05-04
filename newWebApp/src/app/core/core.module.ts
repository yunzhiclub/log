import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PageComponent} from './page/page.component';
import { SizeComponent } from './size/size.component';

@NgModule({
  declarations: [PageComponent, SizeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    PageComponent,
  ]
})
export class CoreModule {
}
