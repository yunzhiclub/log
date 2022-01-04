import {Injectable} from '@angular/core';
import {User} from '../entity/user';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {CommonService} from './common.service';
import {Assert} from '@yunzhi/utils/build/src';
import {catchError, tap} from 'rxjs/operators';
import {isNotNullOrUndefined, Random} from '@yunzhi/ng-mock-api';
import {Page} from '@yunzhi/ng-common';
import {map} from 'rxjs/operators';
import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
/**
 * 用户Service
 */
export class UserService {

  protected baseUrl = 'user';
  /**
   * buffer 设置为 1
   * 只保留最新的登录用户
   */
  protected currentLoginUserSubject = new BehaviorSubject<User | null | undefined>(undefined);
  currentLoginUser$ = this.currentLoginUserSubject.asObservable();

  constructor(protected httpClient: HttpClient,
              private commonService: CommonService,
              private router: Router) {
    // 防止在初始化时与其它服务造成的循环依赖问题
    setTimeout(() => {
      this.initCurrentLoginUser();
    });

  }

  /**
   * 通过Id获取用户
   * @param userId 用户ID
   * author: liMingAo
   */
  public getById(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${userId.toString()}`);
  }

  /**
   * 更新
   * @param userId 用户ID
   * @param user 用户
   * author: liMingAo
   */
  public update(userId: number, user: User): Observable<User> {
    Assert.isNumber(userId, 'userId must be number');
    Assert.isDefined(user, 'user must be defined');
    Assert.isDefined(user.username, 'username must be defined');
    Assert.isDefined(user.password, 'password must be defined');
    return this.httpClient.put<User>(`${this.baseUrl}/${userId}`, user);
  }

  /**
   * 登录
   * @param user 用户
   * @author  weiweiyi
   */
  login(user: { username: string, password: string }): Observable<User> {
    // 新建Headers，并添加认证信息
    let headers = new HttpHeaders();
    // 添加 content-type
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // 添加认证信息
    headers = headers.append('Authorization',
      'Basic ' + btoa(user.username + ':' + encodeURIComponent(user.password)));
    // 发起get请求并返回
    return this.httpClient.get<User>(`${this.baseUrl}/login`, {headers})
      .pipe(tap(data => this.setCurrentLoginUser(data)));
  }

  logout(): Observable<void> {
    return this.httpClient.get<void>(`${this.baseUrl}/logout`).pipe(tap(() => this.currentLoginUserSubject.next(null)));
  }

  /**
   * 删除
   */
  public delete(userId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${userId.toString()}`);
  }

  /**
   * 分页方法
   * @param page 第几页
   * @param size 每页条数
   * @param param 查询参数
   */
  public page(page: number, size: number, param: { username?: string, name?: string }): Observable<Page<User>> {
    const httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString())
      .append('username', isNotNullOrUndefined(param.username) ? param.username.toString() : '')
      .append('name', isNotNullOrUndefined(param.name) ? param.name : '');
    // 返回根据相应链接订阅的数据，将数据中的每一个json对象转换为 User 对象。
    return this.httpClient.get<Page<User>>(`${this.baseUrl}/page`, {params: httpParams})
      .pipe(map(data => new Page<User>(data).toObject(o => new User(o))));
  }

  /**
   * 重置密码
   * @param id 用户id
   */
  public resetPassword(id: number): Observable<string> {
    Assert.isNotNullOrUndefined(id, 'id未传入');
    const url = `${this.baseUrl}/resetPassword/${id}`;
    return this.httpClient.patch<string>(url, {});
  }

  /**
   * 用户新增
   */
  public save(user: User): Observable<User> {
    // 向后台请求,并通过管道返回User对象
    return this.httpClient.post<User>(`${this.baseUrl}`, user)
      .pipe(map(data => new User(data)));
  }

  /**
   * 设置当前登录用户
   * @param user 登录用户
   */
  setCurrentLoginUser(user: User | undefined): void {
    if (user !== this.currentLoginUserSubject.value) {
      this.currentLoginUserSubject.next(user);
    }
  }

  /**
   * 请求当前登录用户
   */
  initCurrentLoginUser(callback?: () => void): void {
    this.httpClient.get<User>(`${this.baseUrl}/me`)
      .subscribe((user: User) => {
          this.setCurrentLoginUser(user);
        }, () => {
          if (callback) {
            callback();
          }
          try {
            this.router.navigateByUrl('/login').then();
          } catch (e) {
            console.error('在跳转路由时发生错误', '/login');
          }
        },
        () => {
          if (callback) {
            callback();
          }
        });
  }
  /**
   * 验证原密码是否正确
   */
  public oldPasswordValidator(): AsyncValidatorFn {
    return (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.checkPasswordIsRight(ctrl.value)
        .pipe(map((isRight: boolean) => (isRight ? null : {passwordError: true})),
          catchError(async () => null));
    };
  }

  /**
   * 校验密码是否正确
   * @param oldPassword 密码
   */
  public checkPasswordIsRight(oldPassword: string): Observable<boolean> {
    // 由于后台接收时接收两个参数， 而且不能为null，newPassword未使用到，传入随机值
    // 如果传入user， user的password会被自动加密， 密码必然错误
    const vUser = {password: oldPassword, newPassword: Random.nextString('', 6)};
    return this.httpClient.post<boolean>(this.baseUrl + '/checkPasswordIsRight', vUser);
  }

  /**
   * 校验新密码与校验密码是否相同
   * @param control 表单
   */
  public confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword')?.value;
    const confirmNewPassword = control.get('confirmNewPassword')?.value;

    // 判断确认密码与新密码是否相同
    if (newPassword && confirmNewPassword) {
      return newPassword !== confirmNewPassword ? {confirmPasswordError: true} : null;
    }
    return null;
  };
  /**
   * 登录用户修改密码
   * @param newPassword 新密码
   * @param oldPassword 旧密码
   */
  public updatePassword(newPassword: string, oldPassword: string): Observable<void> {
    const vUser = {password: oldPassword, newPassword: encodeURIComponent(newPassword)};
    return this.httpClient.put<void>(this.baseUrl + '/updatePassword', vUser);
  }
}
