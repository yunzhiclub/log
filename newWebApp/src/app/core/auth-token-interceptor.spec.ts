import { AuthTokenInterceptor } from './auth-token-interceptor';
import {async, TestBed} from '@angular/core/testing';
import {UserService} from '../service/user.service';
import {UserStubService} from '../test/service/user-stub.service';


describe('AuthTokenInterceptor', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: UserService, useClass: UserStubService}
      ]
    })
      .compileComponents();
  }));


  it('should create an instance', () => {
    const userService: UserService = TestBed.get(UserService);
    expect(new AuthTokenInterceptor(userService)).toBeTruthy();
  });
});
