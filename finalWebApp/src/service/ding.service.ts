import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Page} from "@yunzhi/ng-common";
import {HttpClient, HttpParams} from "@angular/common/http";
import {isNotNullOrUndefined} from "@yunzhi/ng-mock-api";
import {map} from "rxjs/operators";
import {Ding} from "../entity/ding";
import {User} from "../entity/user";
import {Assert} from "@yunzhi/utils/build/src";

/**
 * 机器人管理service
 */
@Injectable({
  providedIn: 'root'
})
export class DingService {
  protected baseUrl = 'setting';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * 分页方法
   * @param page 第几页
   * @param size 每页条数
   * @param param 查询参数
   */
  public page(page: number, size: number, param: { name?: string, clientId?: number, connectionStatus: number }): Observable<Page<Ding>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('name', isNotNullOrUndefined(param.name) ? param.name : '')
      .append('clientId', isNotNullOrUndefined(param.clientId) ? param.clientId : '')
      .append('connectionStatus', isNotNullOrUndefined(param.connectionStatus) ? param.connectionStatus : '');
    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 User 对象。
    return this.httpClient.get<Page<Ding>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<Ding>(data).toObject(o => new Ding(o))));
  }

  /**
   * 启用或停用机器人
   * @param id 机器人id
   */
  public startOrEnd(id: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${id.toString()}`);
  }

  /**
   * 根据id获取Ding
   * @param dingId 机器人Id
   */
  public getById(dingId: number): Observable<Ding> {
    return this.httpClient.get<Ding>(`${this.baseUrl}/${dingId.toString()}`);
  }

  /**
   * 编辑
   * @param dingId 机器人id
   * @param ding 机器人
   */
  public update(dingId: number, ding: Ding): Observable<Ding> {
    Assert.isNumber(dingId, 'type of id must be number');
    console.log(ding.client);
    return this.httpClient.put<Ding>(`${this.baseUrl}/${dingId}`, ding);
  }
}
