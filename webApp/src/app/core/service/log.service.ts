import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Log} from '../entity/Log';
import {Page} from '../entity/Page';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LogService {
    private baseUrl = '/log';

    constructor(private httpClient: HttpClient) {
    }

    page(params: {clientId?: number, page: number, size: number}): Observable<Page<Log>> {
        const  queryParams = {
            clientId: params.clientId ? params.clientId.toLocaleString() : null,
            page: params.page.toLocaleString(),
            size: params.size.toLocaleString()
        };
        const url = `${this.baseUrl}/page`;
        return this.httpClient.get<Page<Log>>(url, {params: queryParams});
    }
}
