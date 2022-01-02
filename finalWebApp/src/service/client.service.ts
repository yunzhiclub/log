import {Injectable} from '@angular/core';
import {Client} from '../entity/client';
import {Observable} from 'rxjs';
import {Page} from '@yunzhi/ng-common';
import {HttpClient, HttpParams} from '@angular/common/http';
import {isNotNullOrUndefined} from '@yunzhi/ng-mock-api';
import {CommonService} from './common.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {User} from '../entity/user';
import {Assert} from '@yunzhi/utils';

@Injectable({
  providedIn: 'root'
})

export class ClientService {
  protected baseurl = 'client';
  constructor(protected httpClient: HttpClient,
              private commonService: CommonService,
              private router: Router) {
  }
  /**
   * 分页方法
   * @param page 第几页
   * @param size 每页条数
   * @param param 查询参数
   * author: liMingAo
   */
  public page(page: number, size: number, param: {name?: String}): Observable<Page<Client>> {
    console.log('servicePage')
    const httpParams = new HttpParams()
      .append('page',page.toString())
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
}
