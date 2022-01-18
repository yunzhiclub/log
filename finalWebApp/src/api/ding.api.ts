import {ApiInjector, Assert, MockApiInterface, randomNumber, randomString} from '@yunzhi/ng-mock-api';
import {Ding} from '../entity/ding';

export class DingApi implements MockApiInterface {
  protected url = 'setting';
  getInjectors(): ApiInjector[] {
    return [{
      method: 'GET',
      description: 'getDing',
      url: `/setting/ding`,
      result: (urlMatches: Array<string>) => {
        const url = urlMatches[0];
        Assert.isString(url, 'url mast be string');
        return {
          webHook: randomString('webHook'),
          secret: randomString('secret')
        } as Ding
      }
    },
      {
        method: 'POST',
        description: 'setDing',
        url: '/setting',
        result: (urlMatches: any, options: {body: Ding;}) => {

          let body = {} as Ding;
          if(options) {
            body = options.body;
          }
          Assert.isString(body.webHook, body.secret, 'webHook and secret mast be string');
          return {
            webHook: body.webHook,
            secret: body.secret
          } as Ding
        }
      },
      {
        method: "POST",
        description: "addDing",
        url: this.url,
        result: (urlMatches: any, options: {body: Ding}) => {
          let body = {} as Ding;
          if (options) {
            body = options.body;
          }
          // 断言传入的数据不为空
          Assert.isString(body.name, 'name must be set');
          Assert.isNumber(body.clientId, 'clientId must be set');
          Assert.isString(body.webHook, 'webHook must be set');
          Assert.isString(body.secret, 'secret must be set');
          Assert.isDefined(body.state, 'state must be set')
          // 构造返回数据
          return {
            id: randomNumber(),
            name: body.name,
            clientId: body.clientId,
            webHook: body.webHook,
            secret: body.secret,
            state: body.state
          } as Ding;
        }
      }]
  }
}
