import {Injectable} from '@angular/core';
import {User} from '../entity/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {CommonService} from './common.service';
import {Assert} from '@yunzhi/utils/build/src';
import {tap} from 'rxjs/operators';

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
  protected currentLoginUserSubject = new BehaviorSubject<User | null>(null);
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
   * @author: weiweiyi
   */
  login(user: { username: string, password: string}): Observable<User> {
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


}
