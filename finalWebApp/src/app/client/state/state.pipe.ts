import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {isNotNullOrUndefined} from "@yunzhi/utils";

@Pipe({
  name: 'statePipe'
})
export class StatePipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {
  }

  transform(input: boolean, ...args: unknown[]): SafeHtml {

    if (!isNotNullOrUndefined(input)){
      return '-';
    }

    let clazz = 'success';
    let value = '在线';

    if (!input) {
      clazz = 'secondary';
      value = '离线'
    }

    return this.domSanitizer.bypassSecurityTrustHtml(`<span class="badge badge-${clazz}">${value}</span>`)
  }

}
