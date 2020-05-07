import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Client} from '../../norm/entity/client';



@Component({
  selector: 'app-client-select',
  templateUrl: './client-select.component.html',
  styleUrls: ['./client-select.component.sass']
})
export class ClientSelectComponent implements OnInit {

  @Output() selected = new EventEmitter<Client>();
  @Input() client: Client;
  url = '/client/page';

  constructor() {
  }

  ngOnInit() {
  }

  onSelected(client: Client): void {
    console.log(client);
    this.selected.emit(client);
  }

}
