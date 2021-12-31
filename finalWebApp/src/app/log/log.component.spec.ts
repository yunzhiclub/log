import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LogComponent} from './log.component';
import {LogModule} from './log.module';
import {ApiTestingModule} from '../../api/api.testing.module';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {getTestScheduler} from 'jasmine-marbles';
import {ActivatedRoute} from '@angular/router';

describe('LogComponent', () => {
  let component: LogComponent;
  let fixture: ComponentFixture<LogComponent>;
  let route: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        LogModule,
        ApiTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // 获取ActivatedRoute后再强制转换为我们实际在RouterTestingModule中提供的ActivatedRouteStub
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
  });

  it('should create', () => {
    // 发送数据，触发 C 层的订阅方法
    route.queryParamsSubject.next({});
    expect(component).toBeTruthy();
    getTestScheduler().flush();
    fixture.detectChanges();
    fixture.autoDetectChanges();
  });
});
