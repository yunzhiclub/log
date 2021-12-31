import {Pipe, PipeTransform} from '@angular/core';

/**
 * 如果是null或undefined显示 -
 */

@Pipe({
  name: 'beDefined'
})
export class BeDefinedPipe implements PipeTransform {

  transform(value: any): any {
    if (value === null || value === undefined) {
      return '-';
    } else {
      return value;
    }
  }

}
