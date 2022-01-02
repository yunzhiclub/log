import {ApiInjector, Assert, MockApiInterface, randomNumber, randomTimestamp} from '@yunzhi/ng-mock-api';
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
      result: (urlMatches: (string)[], options: { params: HttpParams; }) => {
        const params = options.params as HttpParams;
        console.log('接受的参数为：', params);
        const page = +params.get('page');
        const size = +params.get('size');
        // 参数校验
        Assert.isNotNullOrUndefined(page, size, 'page,size为必选');
        Assert.isDefined(params.get('name'), self.name + ' 选填参数未添加全');
        const beginId = page * size;
        const clients = new Array<Client>();
        const time = new Date();
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
            token: randomString('token'),
            lastStartTime: time,
            lastSendTime: time,
            todayLog: todayLog
          } as Client);
        }
        return {
          content: clients,
          number: page, size,
          totalElements: 40 + randomNumber()
        } as Page<Client>
      }
    }];
  }
}
