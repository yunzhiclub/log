import {Injectable} from '@angular/core';
import {User} from '../entity/user';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {CommonService} from './common.service';
import {Assert} from '@yunzhi/utils/build/src';

@Injectable({
  providedIn: 'root'
})
/**
 * 用户Service
 */
export class UserService {
  protected baseUrl = 'user';

  constructor(protected httpClient: HttpClient,
              private commonService: CommonService,
              private router: Router) {
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
    console.log(userId);
    console.log(user);
    return this.httpClient.put<User>(`${this.baseUrl}/${userId}`, user);
  }
}
