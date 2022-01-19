import {ApiInjector, Assert, MockApiInterface, randomBoolean, randomNumber, RequestOptions} from '@yunzhi/ng-mock-api';
import {HttpParams} from '@angular/common/http';
import {Client} from '../entity/client';
import {randomString} from '@yunzhi/utils';
import {DayLog} from '../entity/day-log';
import {Page} from '@yunzhi/ng-common';

export class ClientApi implements MockApiInterface {
  protected url = 'client';

  getInjectors(): ApiInjector[] {
    return [{
      method: 'GET',
      description: '分页',
      url: this.url + '/page',
      result: (urlMatches: (string)[], options: {params: HttpParams;}) => {
        const params = options.params as HttpParams;
        console.log('接受的参数为：', params);
        const page = +params.get('page');
        const size = +params.get('size');
        // 参数校验
        Assert.isNotNullOrUndefined(page, size, 'page,size为必选');
        Assert.isDefined(params.get('name'), self.name + ' 选填参数未添加全');
        const beginId = page * size;
        const clients = new Array<Client>();
        const time = randomNumber(10);
        for (let i = 0; i < +size; i++) {
          const todayLog = {
            id: randomNumber(),
            errorCount: randomNumber(),
            infoCount: randomNumber(),
            warnCount: randomNumber()
          } as DayLog;
          clients.push({
            id: beginId + i + 1,
            name: randomString('名字'),
            token: randomString('token****'),
            url: 'http://' + randomString(),
            lastStartTime: time,
            lastSendTime: time,
            todayLog: todayLog,
            state: randomBoolean()
          } as Client);
        }
        return {
          content: clients,
          number: page, size,
          totalElements: 40 + randomNumber()
        } as Page<Client>
      }
    }, {
      method: 'GET',
      url: `${this.url}/(\\d+)`,
      description: '根据ID获取client',
      result: (urlMatches: Array<string>) => {
        // 使用 + 完成字符串向数字的转换
        const id = +urlMatches[1];
        Assert.isNumber(id, 'id类型必须为number');
        return {
          id,
          name: randomString('客户端'),
          token: 'ZmYDHrlgfelZsP2YqlbaToub5gP30vORv8HQoGr5',
          url: 'yunzhi.com'
        } as Client;
      }
    },
      {
        method: 'PUT',
        url: `${this.url}/(\\d+)`,
        description: '修改client',
        result: (urlMatches: (string)[], option: {body: {id: number, name: string, token: string, url: string};}) => {
          let body = {} as {id: number, name: string, token: string, url: string};
          let id;

          if (urlMatches) {
            id = +urlMatches[1];
          }
          if (option) {
            body = option.body;
          }

          Assert.isNumber(id, 'id must be set');
          Assert.isString(body.name, 'name must be set');
          Assert.isString(body.token, 'token must be set');
          Assert.isString(body.url, 'url must be set');

          return {
            id: body.id,
            name: body.name,
            token: body.token,
            url: body.url
          } as Client;
        }
      },
      {
        method: 'DELETE',
        url: `${this.url}/(\\d+)`,
        description: '删除'
      },
      {
        method: 'GET',
        url: this.url+'/getAll',
        description: '获取所有client',
        result: () => {
          let clients = [] as Client[];
          for(let i = 0; i< randomNumber(); i++){
            clients.push({
              id: randomNumber(),
              name: randomString('name')
            } as Client)
          }
          return clients;
        }
      },
      {
        method: 'POST',
        description: 'save: 新增client',
        url: this.url,
        result: (urlMatches: any, options: {body: Client;}) => {
          let body = {} as Client;

          if (options) {
            body = options.body;
          }

          // 断言传入的数据不为空
          Assert.isString(body.name, 'name must be set');
          Assert.isString(body.url, 'url must be set');
          Assert.isString(body.token, 'token must be set');

          // 构造返回数据
          return {
            id: randomNumber(),
            name: body.name,
            url: body.url,
            token: body.token,
          } as Client;
        }
      },
      {
        url: this.url + '/existByToken',
        description: '判断Token是否已经存在',
        result: (urlMatches: any, options: RequestOptions): boolean => {
          const params = options.params as HttpParams;
          console.log(params);
          if (!params.has('token')) {
            throw new Error('未接收到查询参数token');
          }
          const Token = params.get('token') as string;
          return Token === 'liming';
        }
      },
      {
        method: 'POST',
        description: 'clean: 清理日志',
        url: this.url+'/clean/(\\d+)',
        result: (urlMatches: (string)[], options: { body: number; }) => {
          let timeStamp: number;
          let id;
          if (urlMatches) {
            id = +urlMatches[1];
          }
          if(options){
            timeStamp = +options.body;
          }
          console.log('id',id,'time',timeStamp)
        }
      }
    ];
  }
}
