import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonalComponent} from './personal.component';
import {getTestScheduler} from 'jasmine-marbles';
import {PersonalModule} from './personal.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ApiTestingModule} from '../../api/api.testing.module';
import {UserService} from '../../service/user.service';
import {User} from '../../entity/user';

describe('PersonalComponent', () => {
  let component: PersonalComponent;
  let fixture: ComponentFixture<PersonalComponent>;
  let userService: UserService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        PersonalModule,
        RouterTestingModule,
        ApiTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService) as unknown as UserService;
  });

  it('should create', () => {
    // 设置当前登录用户
    userService.setCurrentLoginUser({name: '张三', username: 'zhangsan'} as User);
    expect(component).toBeTruthy();
    // 手动控制MockApi发送数据，消除发送数据的延迟
    getTestScheduler().flush();
    // 自动检测变更
    fixture.autoDetectChanges();
  });
});
