import {UserService} from './user.service';
import {User} from '../entity/user';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonService} from './common.service';
import {Router} from '@angular/router';
import {UserApi} from "../api/user.api";

/**
 * 用于单元测试的测试桩
 */
@Injectable()
export class UserStubService extends UserService {

  constructor(httpClient: HttpClient, commonService: CommonService, router: Router) {
    super(httpClient, commonService, router);
    this.currentLoginUserSubject.next(UserApi.currentLoginUser);
  }

  /**
   * 发送当前登录用户
   * @param user 用户
   */
  nextCurrentLoginUser(user: User): void {
    this.currentLoginUserSubject.next(user);
  }
}
