import {Injectable} from '@angular/core';
import {Client} from '../entity/client';
import {Observable} from 'rxjs';
import {Page} from '@yunzhi/ng-common';
import {HttpClient, HttpParams} from '@angular/common/http';
import {isNotNullOrUndefined} from '@yunzhi/ng-mock-api';
import {CommonService} from './common.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

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
}
