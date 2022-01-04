import {ApiInjector, Assert, MockApiInterface} from '@yunzhi/ng-mock-api';
import {User} from '../entity/user';
import {randomNumber, randomString} from '@yunzhi/utils';
import {Page} from '@yunzhi/ng-common';
import {HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

export class UserApi implements MockApiInterface {
  protected url = 'user';
  private sessionKey = 'currentLoginUser';
  public static currentLoginUser = {
    id: randomNumber(12345),
    name: randomString('name'),
    username: randomString('username'),
  } as User;

  /**
   * 获取当前登录用户
   */
  getCurrentLoginUser(): User {
    return UserApi.currentLoginUser;
  }

  /**
   * 清除当前登录用户
   */
  private clearCurrentLoginUser(): void {
    localStorage.removeItem(this.sessionKey);
  }

  /**
   * 设置当前登录用户
   * @param user 用户
   */
  private setCurrentLoginUser(user: User): void {
    localStorage.setItem(this.sessionKey, JSON.stringify(user));
  }

  getInjectors(): ApiInjector[] {
    return [
      {
        url: this.url + '/login',
        method: 'GET',
        description: '登录',
        result: (urlMatches: any, options: {headers: HttpHeaders;}) => {
          const auth = options.headers.get('Authorization');
          const auths = atob(auth!.substr(6)).split(':');

          const username = auths[0];
          const password = auths[1];
          if (password === 'yunzhi') {
            let user: User;
            user = new User({
              id: randomNumber(),
              username,
              password
            });
            // 设置user基本信息
            user.name = randomString('姓名');
            this.setCurrentLoginUser(user);
            return user;
          } else {
            return new Observable<HttpErrorResponse>(subscriber => {
              subscriber.error(new HttpErrorResponse({status: 401}));
              subscriber.complete();
            });
          }
        }
      },
      {
      method: 'GET',
      description: 'getById 根据ID获取用户  author: liMingAo',
      url: `${this.url}/(\\d+)`,
      result: (urlMatches: Array<string>) => {
        const id = +urlMatches[1];
        Assert.isNumber(id, 'id类型必须为number');
        return {
          id,
          name: randomString('姓名'),
          username: randomString('用户名'),
          password: randomString('密码'),
          email: randomString('邮箱'),
        } as User;
      }
    },
      {
        method: 'PUT',
        description: '更新用户  author: liMingAo',
        url: `${this.url}/(\\d+)`,
        result: (urlMatches: (string)[], option: {
          body: User
        }) => {
          const body = option.body;
          Assert.isString(
            body.username,
            body.password
          );
        }
      },
      {
        url: this.url + '/page',
        method: 'GET',
        description: '分页',
        result: (urlMatches: (string)[], options: { params: HttpParams; }) => {
          const params = options.params as HttpParams;
          console.log('接受的参数为：', params);
          const page = +params.get('page');
          const size = +params.get('size');
          // 参数校验
          Assert.isNotNullOrUndefined(page, size, 'page,size为必选');
          Assert.isDefined(params.get('name'), self.name + ' 选填参数未添加全');
          Assert.isDefined(params.get('username'), self.name + ' 选填参数未添加全');

          const beginId = page * size;
          const users = new Array<User>();
          for (let i = 0; i < +size; i++) {
            users.push({
              id: beginId + i + 1,
              name: randomString('名字'),
              username: randomString('电话'),
              email: randomString('email')
            } as User);
          }
          return {
            content: users, number: page, size, totalElements: 40 + randomNumber()
          } as Page<User>;
        }
      },
      // 重置密码
      {
        method: 'PATCH',
        url: `${this.url}/resetPassword/(\\d+)`,
        description: '重置密码',
        result: (urlMatches: (string)[],
                 options: { params: HttpParams }) => {
          const body = options.params;
          return randomString();
        }
      },
      // 删除用户
      {
        method: 'DELETE',
        url: `${this.url}/(\\d+)`
      },
      {
        method: 'POST',
        url: `${this.url}`,
        description: 'save: 新增用户',
        result: (urlMatches: any, options: { body: User; }) => {
          let body = {} as User;
          if (options) {
            body = options.body;
          }
          Assert.isString(body.username, 'name mast be string');
          Assert.isString(body.name, 'name mast be string');

          return {
            id: randomNumber(),
            name: body.name,
            username: body.username,
            email: body.email,
            password: randomString()
          } as User;
        }
      },
      {
        method: 'GET',
        url: this.url + '/me',
        description: '获取当前登录用户',
        result: () => {
          return this.getCurrentLoginUser();
        }
      },
      // 检验密码是否正确
      {
        method: 'POST',
        url: this.url + '/checkPasswordIsRight',
        result: (urlMatches: (string)[], options: {body: {password: string, newPassword: string};}) => {
          let body = {} as {password: string, newPassword: string};

          if (options) {
            body = options.body;
          }
          Assert.isString(body.password, 'password must be set');
          return 'yunzhi' === body.password;
        }
      },
      // 修改密码
      {
        method: 'PUT',
        url: this.url + '/updatePassword',
        result: (urlMatches: (string)[], options: {body: {password: string, newPassword: string};}) => {
          const body = options.body;
          console.log('接收到的参数为:' + 'oldPassword:' + body.password + '  newPassword' + body.newPassword);
          Assert.isString(body.password, 'password must be set');
          Assert.isString(body.newPassword, 'newPassword must be set');
        }
      },
      /**
       * 注销Test
       * 等注销功能完成后可删除
       * todo
       */
      {
        method: 'GET',
        url: `${this.url}/logoutTest`,
        result: () => {
          if (this.getCurrentLoginUser() !== null) {
            this.clearCurrentLoginUser();
            return null;
          } else {
            return new Observable<HttpErrorResponse>(subscriber => {
              subscriber.next(new HttpErrorResponse({status: 401}));
              subscriber.complete();
            });
          }
        }
      },
    ];
  }
}
