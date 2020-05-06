import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CoreTestingController} from '../core-testing-controller';

@Component({
  selector: 'app-page',
  template: `
    <p>
       page-select works!
    </p>
  `,
  styles: []
})
export class PageComponent implements OnInit {
  @Input() setTotalPages: number;
  @Input() setPage: number;
  @Input() setSize: number;

  @Output() selectedPage = new EventEmitter<number>();
  @Output() selectedSize = new EventEmitter<number>();

  constructor(private controller: CoreTestingController) {
    this.controller.addUnit(this);
  }

  ngOnInit() {
  }

}
