import {ApiInjector, Assert, MockApiInterface, randomNumber, randomString} from '@yunzhi/ng-mock-api';
import {Ding} from '../entity/ding';
import {Client} from '../entity/client';
import {HttpParams} from "@angular/common/http";
import {randomBoolean} from "@yunzhi/utils";
import {Page} from "@yunzhi/ng-common";
import {User} from "../entity/user";

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
      {
        method: "POST",
        description: "addDing",
        url: this.url,
        result: (urlMatches: any, options: { body: Ding }) => {
          let body = {} as Ding;
          if (options) {
            body = options.body;
          }
          // 断言传入的数据不为空
          Assert.isString(body.name, 'name must be set');
          Assert.isNumber(body.client.id, 'clientId must be set');
          Assert.isString(body.webHook, 'webHook must be set');
          Assert.isString(body.secret, 'secret must be set');
          // 构造返回数据
          return {
            id: randomNumber(),
            name: body.name,
            client: body.client,
            webHook: body.webHook,
            secret: body.secret,
          } as Ding;
        }
      },
      {
        method: 'GET',
        url: `${this.url}/(\\d+)`,
        description: '根据ID获取ding',
        result: (urlMatches: Array<string>) => {
          // 使用 + 完成字符串向数字的转换
          const id = +urlMatches[1];
          Assert.isNumber(id, 'id类型必须为number');
          return {
            id,
            name: randomString('客户端'),
            webHook: randomString('webHook'),
            secret: randomString('secret'),
            client: {
              id: randomNumber()
            } as Client,
          } as Ding;
        }
      },
      {
        method: 'PUT',
        description: '更新ding',
        url: `${this.url}/(\\d+)`,
        result: (urlMatches: (string)[], option: {
          body: Ding
        }) => {
          const body = option.body;
          Assert.isString(
            body.webHook,
            body.name,
            body.secret
          );
        }
      }, {
        method: 'GET',
        url: this.url+'/getAll',
        description: '获取所有ding',
        result: () => {
          let dings = [] as Ding[];
          for(let i = 0; i< randomNumber(); i++){
            dings.push({
              id: randomNumber(i),
              name: randomString('name')
            } as Ding)
          }
          return dings;
        }
      },
    ]
  }
}
