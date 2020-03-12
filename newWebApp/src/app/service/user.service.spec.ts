import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
  it('login', () => {
    // 获取service实例
    const service: UserService = TestBed.get(UserService);

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
});
