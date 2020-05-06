import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {HttpRequest} from '@angular/common/http';
import {User} from '../norm/entity/user';
import {VUser} from '../base/vuser';

describe('UserService', () => {
  let service: UserService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));
  beforeEach(() => {
    service = TestBed.get(UserService);
  });
  it('should be created', () => {

    expect(service).toBeTruthy();
  });
  it('login', () => {
    // 获取service实例

    // 准备接收值，调用login方法并订阅以使其发起请求
    let result: boolean;
    service.login('username', 'password').subscribe(value => {
      result = value;
    });

    // 获取请求信息，并断言请求地址、方法、请求的值符合预期
    const httpTestingController: HttpTestingController = TestBed.get(HttpTestingController);
    const req = httpTestingController.expectOne('/user/login');
    expect(req.request.method).toEqual('POST');
    const usernameAndPassword: { username: string, password: string }
      = req.request.body.valueOf();
    expect(usernameAndPassword.username).toEqual('username');
    expect(usernameAndPassword.password).toEqual('password');

    // 模拟返回请求值，断言在订阅中接收到了该值
    req.flush('true');
    expect(result).toBeTruthy();
  });
  it('me', () => {
    // 调用测试方法
    let result;
    service.me().subscribe((user) => {
      result = user;
    });
    // 断言发起了特定的http请求
    const httpTestingController: HttpTestingController = TestBed.get(HttpTestingController);
    const req = httpTestingController.expectOne('/user/me');
    expect(req.request.method).toEqual('GET');

    // 模拟返回数据，请断言在订阅的方法中成功的接收到了数据
    const  mockReturnUser = new User({id: null, username: null, name: null});
    req.flush(mockReturnUser);
    expect(result).toBe(mockReturnUser);
  });
  it('save', () => {
    const user: User = new User(
      {
        name: 'testname',
        username: 'testusername'

      });

    let called = false;

    service.save(user).subscribe((returnUser: User) => {
      called = true;
      expect(returnUser.id).toBe(-1);
    });

    const httpTestingController: HttpTestingController = TestBed.get(HttpTestingController);
    const req = httpTestingController.expectOne('/user');
    expect(req.request.method).toEqual('POST');

    const userBody: User = req.request.body.valueOf();
    expect(userBody.name).toEqual(user.name);
    expect(userBody.username).toEqual(user.username);

    req.flush(new User({id: -1}));

    expect(called).toBe(true);
  });

  it('getById', () => {
    // 调用方法并订阅
    const id = Math.floor(Math.random() * 100);
    let resultUser;
    service.getById(id)
      .subscribe((user) => {
        resultUser = user;
      });

    // 断言发起了http请求
    const httpTestingController: HttpTestingController = TestBed.get(HttpTestingController);
    const req = httpTestingController.expectOne(`/user/${id}`);

    // 断言请求的参数及方法符合预期
    expect(req.request.method).toEqual('GET');

    // 模拟返回数据
    const mockUser = new User();
    req.flush(mockUser);

    // 断言接收数据
    expect(resultUser).toBe(mockUser);
  });

  it('update', () => {
    // 调用方法并订阅
    const user = new User();
    user.id = Math.floor(Math.random() * 100);
    let resultUser;
    service.update(user.id, user)
      .subscribe(result => {
        resultUser = result;
      });

    // 断言发起了http请求
    const httpTestingController: HttpTestingController = TestBed.get(HttpTestingController);
    const req = httpTestingController.expectOne(`/user/${user.id}`);

    // 断言请求的参数及方法符合预期
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toBe(user);

    // 模拟返回数据
    const mockUser = new User();
    req.flush(mockUser);

    // 断言接收数据
    expect(resultUser).toBe(mockUser);
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
    const req = httpTestingController.expectOne(`/user/${id}`);

    // 请求的方法为delete
    expect(req.request.method).toEqual('DELETE');

    // 返回值为可被观察者，该观察者携带的内容为`void`
    expect(called).toBeFalsy();
    req.flush(of());
    expect(called).toBeTruthy();
  });

  /* 分页测试 */
  it('page', () => {
    /* 模拟返回数据 */
    const mockResult = {
      totalPages: 10,
      content: new Array(new User({}), new User({}))
    };

    /* 进行订阅，发送数据后将called置true */
    let called = false;
    service.page({}).subscribe((success: { totalPages: number, content: Array<User> }) => {
      called = true;
      expect(success.totalPages).toEqual(10);
      expect(success.content.length).toBe(2);
    });

    /* 断言发起了http请求，方法为get；请求参数值符合预期 */
    const req = TestBed.get(HttpTestingController).expectOne((request: HttpRequest<any>) => {
      return request.url === '/user';
    });
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('username')).toEqual('');
    expect(req.request.params.get('page')).toEqual('0');
    expect(req.request.params.get('size')).toEqual('10');

    req.flush(mockResult);
    expect(called).toBe(true);
  });

  it('updatePassword', () => {
    const newPassword = 'newPassword';
    let  called = false;
    const vUser = new VUser();
    vUser.newPassword = newPassword;
    service.updatePassword(vUser.newPassword)
      .subscribe(result => {
        called = true;
      });
    const httpTestingController: HttpTestingController = TestBed.get(HttpTestingController);
    const req = httpTestingController.expectOne(`/user/updatePassword`);
    // 断言请求的参数及方法符合预期
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(vUser);
    // 返回值为可被观察者，该观察者携带的内容为`void`
    expect(called).toBeFalsy();
    req.flush(of());
    expect(called).toBeTruthy();
  });
  /* 分页参数测试 */
  it('page params test', () => {
    service.page({ username: 'username', page: 2, size: 20}).subscribe();
    /* 断言发起了http请求，方法为get；请求参数值符合预期 */
    const req = TestBed.get(HttpTestingController).expectOne(
      request => request.url === '/user'
    );
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('username')).toEqual('username');
    expect(req.request.params.get('page')).toEqual('2');
    expect(req.request.params.get('size')).toEqual('20');

    req.flush({});
  });


});
