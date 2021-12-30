import {ApiInjector, Assert, MockApiInterface} from '@yunzhi/ng-mock-api';
import {User} from '../entity/user';
import {randomString} from '@yunzhi/utils';

export class UserApi implements MockApiInterface {
  protected url = 'user';

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
      }];
  }
}
