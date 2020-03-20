/**
 * Client服务测试桩
 * 刘宇轩
 */
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Page} from '../norm/entity/page';
import {Client} from '../norm/entity/client';
import {DayLog} from '../norm/entity/day-log';


@Injectable({
  providedIn: 'root'
})
export class ClientStubService {

  constructor() { }
  /* 传入参数缓存 */
  pageParamsCache: {clientId?: number, page: number, size: number};

  /**
   * page模拟方法
   * @param params 查询参数
   */
  page(params: {clientId?: number, page: number, size: number})
    : Observable<Page<Client>> {
    this.pageParamsCache = params;
    const mockResult = new Page<Client>(new Array<Client>(
      new Client({ id: 1, name: 'NAME', token: 'TOKEN', lastSendTime: null, lastStartTime: null,
        todayLog: new DayLog() }),
      new Client({ id: 2, name: 'NAME', token: 'TOKEN', lastSendTime: null, lastStartTime: null,
        todayLog: new DayLog() })
    ), 1, 2, 5);
    return of(mockResult);
  }
}
