import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Log} from '../norm/entity/log';
import {Page} from '../norm/entity/page';
import {Client} from '../norm/entity/client';

/*后台日志管理-M层
  刘宇轩
 */

@Injectable({
  providedIn: 'root'
})
export class LogService {

  public static logNowPage = 0;

  constructor(private httpClient: HttpClient) { }
  page(params: {clientId?: number, page: number, size: number, message?: string, level?: string}): Observable<Page<Log>> {
    const Params = {
      clientId: params.clientId ? params.clientId.toLocaleString() : null,
      page: params.page.toLocaleString(),
      size: params.size.toLocaleString(),
      message: params.message ? params.message : null,
      level: params.level ? params.level : null
    };
    const url = '/log/page';
    console.log(Params);
    return this.httpClient.get<Page<Log>>(url, {params: Params});
  }
}
