import { Pageable } from '@core/entity/Pageable';
import { Sort } from '@core/entity/Sort';

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
