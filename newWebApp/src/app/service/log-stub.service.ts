/**
 * LOG服务测试桩
 * 刘宇轩
 */
import {Observable, of} from 'rxjs';
import {Log} from '../norm/entity/log';
import {Page} from '../norm/entity/page';
import {Client} from '../norm/entity/client';

export class LogStubService {

  constructor() {
  }


  /* 传入参数缓存 */
  pageParamsCache: {clientId?: number, page: number, size: number};

  /**
   * page模拟方法
   * @param params 查询参数
   */
  page(params: {clientId?: number, page: number, size: number})
    : Observable<Page<Log>> {
    this.pageParamsCache = params;
    const mockResult = new Page<Log>(new Array<Log>(
      new Log({ id: 1, level: 'DEBUG', levelCode: 1, logger: 'logger', context: 'context',
        thread: 'thread', message: 'message', timestamp: 1, client: new Client('client')}),
      new Log({ id: 2, level: 'DEBUG', levelCode: 1, logger: 'logger', context: 'context',
        thread: 'thread', message: 'message', timestamp: 1, client: new Client('client')})
    ), 1, 2, 3);
    return of(mockResult);
  }
}
