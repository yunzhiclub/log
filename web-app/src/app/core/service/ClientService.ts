import { Client } from '@core/entity/Client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '@core/entity/Page';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private baseUrl = '/client';

    constructor(private http: HttpClient) {
    }

    page(param?: any): Observable<Page<Client>> {
        return this.http.get<Page<Client>>(this.baseUrl + '/page');
    }

    save(client: Client): Observable<Client> {
        return this.http.post<Client>(this.baseUrl, client);
    }
}
