import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreTestingController} from './core-testing-controller';
import {SizeComponent} from './size/size.component';
import {PageComponent} from './page/page.component';



@NgModule({
  declarations: [SizeComponent, PageComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SizeComponent,
    PageComponent
  ],
  providers: [
    CoreTestingController
  ]
})
export class CoreTestingModule {

}
