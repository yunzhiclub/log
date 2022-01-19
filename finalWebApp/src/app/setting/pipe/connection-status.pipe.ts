import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {isNotNullOrUndefined} from "@yunzhi/utils";

@Pipe({
  name: 'connectionStatus'
})
export class ConnectionStatusPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {
  }
  transform(connectionStatus: boolean): SafeHtml {
    if (!isNotNullOrUndefined(connectionStatus)){
      return '-';
    }

    let clazz = 'primary';
    let value = '成功';

    if (!connectionStatus) {
      clazz = 'info';
      value = '失败'
    }

    return this.domSanitizer.bypassSecurityTrustHtml(`<span class="badge badge-${clazz}">${value}</span>`)
  }

}
