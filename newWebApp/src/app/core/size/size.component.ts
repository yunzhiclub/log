import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Select} from '../select/select.component';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.sass']
})
export class SizeComponent implements OnInit {
  @Input() size: number;

  @Output() onChangeSize = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  sizeChange(size: number) {
    this.onChangeSize.emit(size);
  }
}
