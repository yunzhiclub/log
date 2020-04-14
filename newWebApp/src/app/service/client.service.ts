import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../norm/entity/page';
import {Client} from '../norm/entity/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public static clientNowPage = 0;
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

  save(client: Client) {
    const url = '/client';
    return this.httpClient.post(url, client);
  }

  /**
   * 获取某个用户
   * @param id 用户ID
   */
  getById(id: number): Observable<Client> {
    const url = `/client/${id}`;
    return this.httpClient.get<Client>(url);
  }

  /**
   * 更新用户
   * @param id id
   * @param client 用户
   */
  update(id: number, client: Client): Observable<Client> {
    const url = `/client/${id}`;
    return this.httpClient.put<Client>(url, client);
  }

  /**
   * 删除用户
   * @param id 用户id
   */
  deleteById(id: number): Observable<void> {
    const url = `/client/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
