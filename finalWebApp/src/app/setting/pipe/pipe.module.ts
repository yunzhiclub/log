import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionStatusPipe } from './connection-status.pipe';
import { StartPipe } from './start.pipe';



@NgModule({
  declarations: [
    ConnectionStatusPipe,
    StartPipe,

  ],
  exports: [
    ConnectionStatusPipe,
    StartPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }
