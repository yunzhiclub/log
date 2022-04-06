import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ClientService} from '../../../service/client.service';
import {DingService} from '../../../service/ding.service';

@Component({
  selector: 'app-ding-select',
  templateUrl: './ding-select.component.html',
  styleUrls: ['./ding-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        return DingSelectComponent
      })
    }
  ]
})
export class DingSelectComponent implements OnInit, ControlValueAccessor {


  dings = [] as {id: number, name: string}[]
  dingId = new FormControl(null);

  constructor(private dingService: DingService) {
  }

  ngOnInit(): void {
    this.dingService.getAll()
      .subscribe(dings => {
        dings.forEach(client => {
          this.dings.push(
            {
              id: client.id,
              name: client.name
            }
          )
        })
      })
  }

  registerOnChange(fn: any): void {
    this.dingId.valueChanges
      .subscribe(value => fn(value));
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(dingId: number): void {
    this.dingId.setValue(dingId);
  }


}
