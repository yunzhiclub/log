import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.sass']
})
export class SizeComponent implements OnInit {
  @Input() size: number;

  @Output() ChangeSize = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  sizeChange(size: number) {
    this.ChangeSize.emit(size);
  }
}
