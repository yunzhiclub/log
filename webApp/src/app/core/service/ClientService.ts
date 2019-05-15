import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Page} from '../entity/Page';
import {Client} from '../entity/Client';


@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private baseUrl = '/client';

    constructor(private http: HttpClient) {
    }

    page(params?: any): Observable<Page<Client>> {
        return this.http.get<Page<Client>>(this.baseUrl + '/page', {params: params});
    }

    save(client: Client): Observable<Client> {
        return this.http.post<Client>(this.baseUrl, client);
    }
}
