import {ApiInjector, Assert, MockApiInterface} from '@yunzhi/ng-mock-api';
import {randomNumber, randomString} from '@yunzhi/utils';
import {Page} from '@yunzhi/ng-common';
import {HttpParams} from '@angular/common/http';
import {Log} from '../entity/log';
import {Client} from '../entity/client';

export class LogApi implements MockApiInterface {
  protected url = 'log';

  getInjectors(): ApiInjector[] {
    return [
      {
        url: this.url + '/page',
        method: 'GET',
        description: '分页',
        result: (urlMatches: (string)[], options: {params: HttpParams;}) => {
          const params = options.params as HttpParams;
          const page = +params.get('page');
          const size = +params.get('size');
          let clientName = params.get('clientName');
          // 如果查询按查询内容返回结果
          if (!clientName) {
            clientName = randomString('name');
          }
          // 参数校验
          Assert.isNotNullOrUndefined(page, size, 'page,size为必选');
          Assert.isDefined(params.get('clientName'), self.name + ' 选填参数未添加全');

          const beginId = page * size;
          const logs = new Array<Log>();
          for (let i = 0; i < +size; i++) {
            logs.push({
              id: beginId + i + 1,
              client: {
                name: clientName
              } as Client,
              level: randomString('level'),
              levelCode: randomNumber(),
              logger: randomString('logger'),
              context: randomString('context'),
              thread: randomString('thread'),
              message: randomString('message'),
              timestamp: randomNumber()
            } as Log);
          }
          return {
            content: logs, number: page, size, totalElements: 40 + randomNumber()
          } as Page<Log>;
        }
      },
    ];
  }
}
