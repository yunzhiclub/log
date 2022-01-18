import {Injectable} from '@angular/core';
import {Client} from '../entity/client';
import {Observable} from 'rxjs';
import {Page} from '@yunzhi/ng-common';
import {HttpClient, HttpParams} from '@angular/common/http';
import {isNotNullOrUndefined} from '@yunzhi/ng-mock-api';
import {map} from 'rxjs/operators';
import {User} from '../entity/user';
import {Assert} from '@yunzhi/utils';

@Injectable({
  providedIn: 'root'
})

export class ClientService {
  protected baseurl = 'client';

  constructor(protected httpClient: HttpClient,
  ) {
  }

  /**
   * 分页方法
   * @param page 第几页
   * @param size 每页条数
   * @param param 查询参数
   * author: liMingAo
   */
  public page(page: number, size: number, param: {name?: String}): Observable<Page<Client>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('name', isNotNullOrUndefined(param.name) ? param.name.toString() : '');
    return this.httpClient.get<Page<Client>>(`${this.baseurl}/page`, {params: httpParams})
      .pipe(map(data => new Page<Client>(data).toObject(o => new Client(o))));
  }

  /**
   * 更新
   * @param clientId 客户端ID
   * @param client 客户端
   */
  public update(clientId: number, client: Client): Observable<User> {
    Assert.isNumber(clientId, 'clientId must be number');
    Assert.isDefined(client, 'client must be defined');
    Assert.isDefined(client.name, 'name must be defined');
    Assert.isDefined(client.token, 'token must be defined');
    Assert.isDefined(client.url, 'url must be defined');
    return this.httpClient.put<User>(`${this.baseurl}/${clientId}`, client);
  }

  /**
   * 通过Id获取用户
   * @param clientId 客户端ID
   */
  public getById(clientId: number): Observable<Client> {
    return this.httpClient.get<Client>(`${this.baseurl}/${clientId.toString()}`);
  }

  /**
   * 删除
   */
  public delete(userId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseurl}/${userId.toString()}`);
  }

  /**
   * 获取所有client
   */
  public getAll(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseurl}/getAll`);
  }

  /**
   * 新增
   */
  public save(client: Client): Observable<Client> {
    // 向后台请求,并通过管道返回User对象
    return this.httpClient.post<Client>(`${this.baseurl}`, client)
      .pipe(map(data => new Client(data)));
  }
  public existByToken(token: string): Observable<boolean> {
    const params = new HttpParams().append('token', token);
    console.log(this.httpClient.get<boolean>(this.baseurl + '/existByToken', {params}))
    return this.httpClient.get<boolean>(this.baseurl + '/existByToken', {params});
  }
}
