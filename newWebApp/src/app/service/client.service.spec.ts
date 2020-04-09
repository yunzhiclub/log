import { TestBed } from '@angular/core/testing';

import {ClientService} from './client.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Page} from '../norm/entity/page';
import {Client} from '../norm/entity/client';
import {HttpRequest} from '@angular/common/http';
import {of} from 'rxjs';

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

  it('save', () => {
    const client: Client = new Client(
      {
        name: 'testname'
      });

    let called = false;

    service.save(client).subscribe((returnClient: Client) => {
      called = true;
      expect(returnClient.id).toBe(-1);
    });

    const httpTestingController: HttpTestingController = TestBed.get(HttpTestingController);
    const req = httpTestingController.expectOne('/client');
    expect(req.request.method).toEqual('POST');

    const clientBody: Client = req.request.body.valueOf();
    expect(clientBody.name).toEqual(client.name);

    req.flush(new Client({id: -1, name: 'test'}));

    expect(called).toBe(true);
  });

  it('getById', () => {
    // 调用方法并订阅
    const id = Math.floor(Math.random() * 100);
    let resultClient;
    service.getById(id)
      .subscribe((client) => {
        resultClient = client;
      });

    // 断言发起了http请求
    const httpTestingController: HttpTestingController = TestBed.get(HttpTestingController);
    const req = httpTestingController.expectOne(`/client/${id}`);

    // 断言请求的参数及方法符合预期
    expect(req.request.method).toEqual('GET');

    // 模拟返回数据
    const mockClient = new Client();
    req.flush(mockClient);

    // 断言接收数据
    expect(resultClient).toBe(mockClient);
  });

  it('update', () => {
    // 调用方法并订阅
    const client = new Client();
    client.id = Math.floor(Math.random() * 100);
    let resultClient;
    service.update(client.id, client)
      .subscribe(result => {
        resultClient = result;
      });

    // 断言发起了http请求
    const httpTestingController: HttpTestingController = TestBed.get(HttpTestingController);
    const req = httpTestingController.expectOne(`/client/${client.id}`);

    // 断言请求的参数及方法符合预期
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toBe(client);

    // 模拟返回数据
    const mockClient = new Client();
    req.flush(mockClient);

    // 断言接收数据
    expect(resultClient).toBe(mockClient);
  });

  it('deleteById', () => {
    // 模拟数据及替身的准备
    // 调用方法
    const id = Math.floor(Math.random() * 100);
    let called = false;
    service.deleteById(id).subscribe(() => {
      called = true;
    });

    // 断言发起了http请求
    const httpTestingController: HttpTestingController = TestBed.get(HttpTestingController);
    const req = httpTestingController.expectOne(`/client/${id}`);

    // 请求的方法为delete
    expect(req.request.method).toEqual('DELETE');

    // 返回值为可被观察者，该观察者携带的内容为`void`
    expect(called).toBeFalsy();
    req.flush(of());
    expect(called).toBeTruthy();
  });

});
