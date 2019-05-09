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
    totalpages: number;
}
