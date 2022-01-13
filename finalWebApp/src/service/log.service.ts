import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '@yunzhi/ng-common';
import {User} from '../entity/user';
import {HttpClient, HttpParams} from '@angular/common/http';
import {isNotNullOrUndefined} from '@yunzhi/ng-mock-api';
import {map} from 'rxjs/operators';
import {Log} from '../entity/log';

/**
 * 日志管理service
 */
@Injectable({
  providedIn: 'root'
})

export class LogService {
  protected baseUrl = 'log';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 分页方法
   * @param page 第几页
   * @param size 每页条数
   * @param param 查询参数
   */
  public page(page: number, size: number, param: {clientId?: number, level?: number, message?: string}): Observable<Page<Log>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('clientId', isNotNullOrUndefined(param.clientId) ? param.clientId.toString() : '')
      .append('level', isNotNullOrUndefined(param.level) ? param.level.toString() : '')
      .append('message', isNotNullOrUndefined(param.message) ? param.message : '')
    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 User 对象。
    return this.httpClient.get<Page<Log>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<Log>(data).toObject(o => new Log(o))));
  }

}
