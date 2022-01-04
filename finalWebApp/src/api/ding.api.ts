import {ApiInjector, Assert, MockApiInterface, randomString} from '@yunzhi/ng-mock-api';
import {Ding} from '../entity/ding';
import {Client} from '../entity/client';

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
      }]
  }
}
