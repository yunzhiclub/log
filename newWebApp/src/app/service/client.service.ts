import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../norm/entity/page';
import {Client} from '../norm/entity/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private httpClient: HttpClient) { }
  page(params: {clientId?: number, page: number, size: number}): Observable<Page<Client>> {
    const Params = {
      clientId: params.clientId ? params.clientId.toLocaleString() : null,
      page: params.page.toLocaleString(),
      size: params.size.toLocaleString()
    };
    const url = '/client/page';
    return this.httpClient.get<Page<Client>>(url, {params: Params});
  }
}
