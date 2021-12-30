import {ApiInjector, Assert, MockApiInterface} from '@yunzhi/ng-mock-api';
import {User} from '../entity/user';
import {randomString} from '@yunzhi/utils';

export class UserApi implements MockApiInterface{
  protected url = 'user';
  getInjectors(): ApiInjector[] {
    return [{
      method: 'GET',
      description: 'getById 根据ID获取用户',
      url: `${this.url}/(\\d+)`,
      result: (urlMatches: Array<string>) => {
        const id = +urlMatches[1];
        Assert.isNumber(id, 'id类型必须为number');
        return {
          id,
          name: randomString('name'),
          username: randomString('username'),
          password: randomString('password'),
          email: randomString('email'),
        } as User;
      }
    },
      {
        method: 'PUT',
        description: 'update',
        url: `${this.url}/(\\d+)`,
        result: (urlMatches: (string)[], option: {
          body: User
        }) => {
          const id = +urlMatches[1];
          const body = option.body;
          Assert.isNumber(
            id
          );
          Assert.isString(
            body.username,
            body.password
          );
          return {} as User;
      }
      }];
  }
}
