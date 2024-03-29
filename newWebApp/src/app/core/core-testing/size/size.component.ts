import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CoreTestingController} from '../core-testing-controller';

@Component({
  selector: 'app-size',
  template: `
    <p>
       size-select works!
    </p>
  `,
  styles: []
})
export class SizeComponent implements OnInit {
  @Input() size: number;

  @Output() changeSize = new EventEmitter<number>();

  constructor(private controller: CoreTestingController) {
    this.controller.addUnit(this);
  }

  ngOnInit() {
  }

}

