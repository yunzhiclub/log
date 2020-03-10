import {Sort} from './Sort';

export class Pageable {
    offset: number;
    pageNumber: number;
    pogeSize: number;
    paged: boolean;
    sort: Sort;
    unpaged: boolean;
}
