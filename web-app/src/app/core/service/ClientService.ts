import { Client } from '@core/entity/Client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private baseUrl = '/client';

    constructor(private http: HttpClient) {
    }

    save(client: Client): Observable<Client> {
        return this.http.post<Client>(this.baseUrl, client);
    }
}
