import {Pageable} from './Pageable';
import {Sort} from './Sort';

export class Page<T> {
    content: Array<T>;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: Pageable;
    size: number;
    sort: Sort;
    totalElements: number;
    totalPages: number;
    constructor(content: Array<T>, number0: number, size: number, totalPages: number) { // 增加构造函数，刘宇轩
      this.content = content;
      this.number = number0;
      this.size = size;
      this.totalPages = totalPages;
    }
}
