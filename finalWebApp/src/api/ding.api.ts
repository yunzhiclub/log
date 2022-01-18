import {ApiInjector, Assert, MockApiInterface, randomString} from '@yunzhi/ng-mock-api';
import {Ding} from '../entity/ding';
import {Client} from '../entity/client';
import {HttpParams} from "@angular/common/http";
import {randomBoolean, randomNumber} from "@yunzhi/utils";
import {Page} from "@yunzhi/ng-common";

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
        result: (urlMatches: any, options: { body: Ding; }) => {

          let body = {} as Ding;
          if (options) {
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

          const beginId = page * size;
          const dings = new Array<Ding>();
          for (let i = 0; i < +size; i++) {
            dings.push({
              id: beginId + i + 1,
              name: randomString('name'),
              client: {
                name: randomString('client')
              } as Client,
              webHook: randomString('webhook'),
              secret: randomString('secret'),
              connectionStatus: randomBoolean(),
              start: randomBoolean()
            } as Ding);
          }
          return {
            content: dings, number: page, size, totalElements: 40 + randomNumber()
          } as Page<Ding>;
        }
      },
      // 启用或停用机器人
      {
        method: 'DELETE',
        url: `${this.url}/(\\d+)`
      },
    ]
  }
}
