import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {User} from '../norm/entity/User';
import {of} from 'rxjs';

fdescribe('UserService', () => {
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

  it('save', () => {
    const user: User = new User(
      {
        name: 'testname',
        username: 'testusername',
        email: 'testemail'

      });

    let called = false;

    service.save(user).subscribe((returnUser: User) => {
      called = true;
      expect(returnUser.id).toBe(-1);
    });

    const httpTestingController: HttpTestingController = TestBed.get(HttpTestingController);
    const req = httpTestingController.expectOne('http://localhost:8080/User');
    expect(req.request.method).toEqual('POST');

    const userBody: User = req.request.body.valueOf();
    expect(userBody.name).toEqual(user.name);
    expect(userBody.username).toEqual(user.username);
    expect(userBody.email).toEqual(user.email);

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
    const req = httpTestingController.expectOne(`http://localhost:8080/User/${id}`);

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
    const req = httpTestingController.expectOne(`http://localhost:8080/User/${user.id}`);

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
    const req = httpTestingController.expectOne(`http://localhost:8080/User/${id}`);

    // 请求的方法为delete
    expect(req.request.method).toEqual('DELETE');

    // 返回值为可被观察者，该观察者携带的内容为`void`
    expect(called).toBeFalsy();
    req.flush(of());
    expect(called).toBeTruthy();
  });

});
