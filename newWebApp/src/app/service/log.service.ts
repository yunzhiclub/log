import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Log} from '../norm/entity/Log';
import {Page} from '../norm/entity/Page';

/*后台日志管理-M层

 */

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private httpClient: HttpClient) { }
  page(params: {clientId?: number, page: number, size: number}): Observable<Page<Log>> {
    const Params = {
      clientId: params.clientId ? params.clientId.toLocaleString() : null,
      page: params.page.toLocaleString(),
      size: params.size.toLocaleString()
    };
    const url = '/log/page';
    return this.httpClient.get<Page<Log>>(url, {params: Params});
  }
}
