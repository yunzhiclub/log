import {ApiInjector, Assert, MockApiInterface} from '@yunzhi/ng-mock-api';
import {User} from '../entity/user';
import {randomNumber, randomString} from '@yunzhi/utils';
import {Page} from '@yunzhi/ng-common';
import {HttpParams} from '@angular/common/http';

export class UserApi implements MockApiInterface {
  protected url = 'user';
  public static currentLoginUser = {
    id: randomNumber(12345),
    name: randomString('name'),
    username: randomString('username'),
  } as User;

  getInjectors(): ApiInjector[] {
    return [{
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
        result: (urlMatches: (string)[], options: {params: HttpParams;}) => {
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
                 options: {params: HttpParams}) => {
          const body = options.params;
          return randomString();
        }
      },
      // 删除用户
      {
        method: 'DELETE',
        url: `${this.url}/(\\d+)`
      },
    ];
  }
}
