import { TestBed } from '@angular/core/testing';

import {ClientService} from './client.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Page} from '../norm/entity/page';
import {Client} from '../norm/entity/client';
import {HttpRequest} from '@angular/common/http';

describe('ClientService', () => {
  let service: ClientService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    service = TestBed.get(ClientService);
  });


  /* 分页测试 */
  it('page分页测试', () => {
    /* 模拟返回数据 */
    const mockResult = new Page<Client>(new Array<Client>(
      new Client({id: 1, name: 'NAME', lastSendTime: undefined, lastStartTime: undefined, todayLog: undefined, token: 'TOKEN'})
    ), 12, 34, 56);

    /* 进行订阅，发送数据后将called置true */
    let called = false;
    const clientId = 1;
    const page = 2;
    const size = 3;
    service.page({clientId, page, size}).subscribe((success: Page<Client> ) => {
      called = true;
      expect(success).toEqual(new Page<Client>(new Array<Client>(
        new Client({id: 1, name: 'NAME', lastSendTime: undefined, lastStartTime: undefined, todayLog: undefined, token: 'TOKEN'})
      ), 12, 34, 56));
    });

    /* 断言发起了http请求，方法为get；请求参数值符合预期 */
    const req = TestBed.get(HttpTestingController).expectOne((request: HttpRequest<any>) => {
      return request.url === '/client/page';
    });
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('clientId')).toEqual('1');
    expect(req.request.params.get('page')).toEqual('2');
    expect(req.request.params.get('size')).toEqual('3');

    req.flush(mockResult);
    expect(called).toBe(true);
  });

  /* 分页参数测试 */
  it('page params test分页参数测试', () => {
    service.page({clientId: 123, page: 456, size: 789}).subscribe();
    /* 断言发起了http请求，方法为get；请求参数值符合预期 */
    const req = TestBed.get(HttpTestingController).expectOne(
      request => request.url === '/client/page'
    );
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('clientId')).toEqual('123');
    expect(req.request.params.get('page')).toEqual('456');
    expect(req.request.params.get('size')).toEqual('789');

    req.flush({});
  });
});
