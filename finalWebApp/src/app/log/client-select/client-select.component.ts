import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ClientService} from '../../../service/client.service';

/**
 * 客户端选择组件
 */
@Component({
  selector: 'app-client-select',
  templateUrl: './client-select.component.html',
  styleUrls: ['./client-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return ClientSelectComponent
      })
    }
  ]
})
export class ClientSelectComponent implements OnInit, ControlValueAccessor {

  clients = [] as {id: number, name: string}[]
  clientId = new FormControl(0);

  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.clientService.getAll()
      .subscribe(clients => {
        clients.forEach(client => {
          this.clients.push(
            {
              id: client.id,
              name: client.name
            }
          )
        })
      })
  }

  registerOnChange(fn: any): void {
    this.clientId.valueChanges
      .subscribe(value => fn(value));
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(clientId: number): void {
    this.clientId.setValue(clientId);
  }

}
