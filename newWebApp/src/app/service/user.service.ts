import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, ReplaySubject} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

import {User} from '../norm/entity/user';
import {VUser} from '../base/vuser';
import {AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /*用户管理当前页*/
  public static userNowPage = 0;
  public currentLoginUser: User;
  public currentLoginUser$: Observable<User>;
  private currentLoginUserSubject = new ReplaySubject<User>(1);
  /** 数据源 */
  private isLogin: BehaviorSubject<boolean>;

  /** 数据源对应的订阅服务 */
  public isLogin$: Observable<boolean>;

  private isLoginCacheKey = 'isLogin';

  constructor(private httpClient: HttpClient) {
    const isLogin: string = window.sessionStorage.getItem(this.isLoginCacheKey);
    this.isLogin = new BehaviorSubject(this.convertStringToBoolean(isLogin));
    this.isLogin$ = this.isLogin.asObservable();
    this.currentLoginUser$ = this.currentLoginUserSubject.asObservable();
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


  page(params: { username?: string, page?: number, size?: number }):
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
  /**
   * @param password 密码
   */
  public checkPasswordIsRight(password: string): Observable<boolean> {
    const vUser = new VUser();
    vUser.password = password;
    return this.httpClient.post<boolean>(`/user/validateOldPassword`, vUser);
  }

  /**
   * 验证原密码是否正确
   */
  public oldPasswordValidator(): AsyncValidatorFn {
    return (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.checkPasswordIsRight(ctrl.value)
        .pipe(map((isRight: boolean) => (isRight ? null : {passwordError: true})),
          catchError(() => of(null)));
    };
  }

  /**
   * 验证新密码与确认密码是否相同
   * @param control 表单
   */
  public confirmPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const newPassword = control.get('newPassword').value;
    const confirmNewPassword = control.get('confirmNewPassword').value;

    // 判断确认密码与新密码是否相同
    if (newPassword && confirmNewPassword) {
      return newPassword !== confirmNewPassword ? {confirmPasswordError: true} : null;
    }
    return null;
  }

  /**
   * 登录用户修改密码
   * @param newPassword 新密码
   */
  public updatePassword(newPassword: string): Observable<void> {
    const vUser = new VUser();
    vUser.newPassword = encodeURIComponent(newPassword);

    return this.httpClient.put<void>(`/user/updatePassword`, vUser);
  }
}
