import { TestBed } from '@angular/core/testing';
import { LogService } from './log.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Log} from '../norm/entity/log';
import {HttpRequest} from '@angular/common/http';
import {Page} from '../norm/entity/page';
import {Client} from '../norm/entity/client';

describe('LogService', () => {
  let service: LogService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    service = TestBed.get(LogService);
  });


  /* 分页测试 */
  it('page分页测试', () => {
    /* 模拟返回数据 */
    const mockResult = new Page<Log>(new Array<Log>(
      new Log({ id: 1, level: 'DEBUG', levelCode: 1, logger: 'logger', context: 'context',
        thread: 'thread', message: 'message', timestamp: 1, client: new Client()})
    ), 1, 2, 3);

    /* 进行订阅，发送数据后将called置true */
    let called = false;
    const clientId = 1;
    const page = 2;
    const size = 3;
    service.page({clientId, page, size}).subscribe((success: Page<Log> ) => {
      called = true;
      expect(success).toEqual(new Page<Log>(new Array<Log>(
        new Log({ id: 1, level: 'DEBUG', levelCode: 1, logger: 'logger', context: 'context',
          thread: 'thread', message: 'message', timestamp: 1, client: new Client()})
      ), 1, 2, 3));
    });

    /* 断言发起了http请求，方法为get；请求参数值符合预期 */
    const req = TestBed.get(HttpTestingController).expectOne((request: HttpRequest<any>) => {
      return request.url === '/log/page';
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
    service.page({clientId: 11, page: 22, size: 33}).subscribe();
    /* 断言发起了http请求，方法为get；请求参数值符合预期 */
    const req = TestBed.get(HttpTestingController).expectOne(
      request => request.url === '/log/page'
    );
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('clientId')).toEqual('11');
    expect(req.request.params.get('page')).toEqual('22');
    expect(req.request.params.get('size')).toEqual('33');

    req.flush({});
  });
});
