import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../norm/entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /** 数据源 */
  private isLogin = new BehaviorSubject<boolean>(false);

  /** 数据源对应的订阅服务 */
  public isLogin$ = this.isLogin.asObservable();

  constructor(private httpClient: HttpClient) { }
  /**
   * 用户登录
   * @param username 用户名
   * @param password 密码
   * @return 登录成功:true; 登录失败: false。
   */
  login(username: string, password: string): Observable<boolean> {
    const url = '/user/login';
    return this.httpClient.post<boolean>(url, {username, password});
  }
  /**
   * 设置登录状态
   * @param isLogin 登录状态
   */
  setIsLogin(isLogin: boolean) {
    this.isLogin.next(isLogin);
  }

  save(user: User) {
    const url = '/user';
    return this.httpClient.post<User>(url, user);
  }

  /**
   * 获取某个用户
   * @param id 用户ID
   */
  getById(id: number): Observable<User> {
    const url = `/user/${id}`;
    return this.httpClient.get<User>(url);
  }

  /**
   * 更新用户
   * @param id id
   * @param user 用户
   */
  update(id: number, user: User): Observable<User> {
    const url = `/user/${id}`;
    return this.httpClient.put<User>(url, user);
  }

  /**
   * 删除用户
   * @param id 用户id
   */
  deleteById(id: number): Observable<void> {
    const url = `/user/${id}`;
    return this.httpClient.delete<void>(url);
  }

  page(params: { username?: string, name?: string, email?: string, page?: number, size?: number }):
    Observable<{ totalPages: number, content: Array<User> }> {
    const url = '/user';

    /* 设置默认值 */
    if (params.page === undefined) {
      params.page = 0;
    }
    if (params.size === undefined) {
      params.size = 10;
    }

    /* 初始化查询参数 */
    const queryParams = new HttpParams()
      .set('page', params.page.toString())
      .set('size', params.size.toString());
    console.log(queryParams);

    return this.httpClient.get<{ totalPages: number, content: Array<User> }>(url, {params: queryParams});
  }
}
