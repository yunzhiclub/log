import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {isNotNullOrUndefined} from "@yunzhi/utils";

@Pipe({
  name: 'start'
})
export class StartPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {
  }
  transform(connectionStatus: boolean): SafeHtml {
    if (!isNotNullOrUndefined(connectionStatus)){
      return '-';
    }

    let clazz = 'primary';
    let value = '启用';

    if (!connectionStatus) {
      clazz = 'info';
      value = '停用'
    }

    return this.domSanitizer.bypassSecurityTrustHtml(`<span class="badge badge-${clazz}">${value}</span>`)
  }

}
