import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

import {User} from '../norm/entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /** 数据源 */
  private isLogin: BehaviorSubject<boolean>;

  /** 数据源对应的订阅服务 */
  public isLogin$: Observable<boolean>;

  private isLoginCacheKey = 'isLogin';

  constructor(private httpClient: HttpClient) {
    const isLogin: string = window.sessionStorage.getItem(this.isLoginCacheKey);
    this.isLogin = new BehaviorSubject(this.convertStringToBoolean(isLogin));
    this.isLogin$ = this.isLogin.asObservable();

  }
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
    window.sessionStorage.setItem(this.isLoginCacheKey, this.convertBooleanToString(isLogin));
    this.isLogin.next(isLogin);
  }
  /**
   * 注销
   */
  logout(): Observable<void> {
    const url = '/user/logout';
    return this.httpClient.get<void>(url);
  }
  /**
   * 获取当前登录的用户
   */
  me(): Observable<User> {
    const url = '/user/me';
    return this.httpClient.get<User>(url);
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
    console.log('执行删除代码');
    return this.httpClient.delete<void>(url);
  }


  page(params: { username?: string, email?: string, page?: number, size?: number }):
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
      .set('username', params.username ? params.username : '')
      .set('email', params.email ? params.email : '')
      .set('page', params.page.toString())
      .set('size', params.size.toString());
    console.log(queryParams);

    return this.httpClient.get<{ totalPages: number, content: Array<User> }>(url, {params: queryParams});
  }

  /**
   * 字符串转换为boolean
   * @param value 字符串
   * @return 1 true; 其它 false
   */
  convertStringToBoolean(value: string) {
  return value === '1';
  }

/**
 * boolean转string
 * @param value boolean
 * @return '1' true; '0' false;
 */
convertBooleanToString(value: boolean) {
  return value ? '1' : '0';
}
  /**
   * 重置密码
   * @param id  用户id
   * @param user  用户
   */
  public resetPassword(id: number): Observable<void> {
    const url = `/user/resetPassword/${id}`;
    return this.httpClient.put<void>(url, id);
  }
}
