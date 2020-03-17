import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../norm/entity/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  save(user: User) {
    const url = 'http://localhost:8080/User';
    return this.httpClient.post<User>(url, user);
  }

  /**
   * 获取某个用户
   * @param id 用户ID
   */
  getById(id: number): Observable<User> {
    const url = `http://localhost:8080/User/${id}`;
    return this.httpClient.get<User>(url);
  }

  /**
   * 更新用户
   * @param id id
   * @param user 用户
   */
  update(id: number, user: User): Observable<User> {
    const url = `http://localhost:8080/User/${id}`;
    return this.httpClient.put<User>(url, user);
  }

  /**
   * 删除用户
   * @param id 用户id
   */
  deleteById(id: number): Observable<void> {
    const url = `http://localhost:8080/User/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
