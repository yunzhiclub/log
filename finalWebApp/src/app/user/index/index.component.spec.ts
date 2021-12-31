import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndexComponent } from './index.component';
import {getTestScheduler} from 'jasmine-marbles';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ApiTestingModule} from '../../../api/api.testing.module';
import {ActivatedRoute} from '@angular/router';
import {IndexModule} from './index.module';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let route: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [  ],
      imports: [
        RouterTestingModule,
        ApiTestingModule,
        IndexModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    // 将单元测试创建的IndexComponent组建赋值给fixture
    fixture = TestBed.createComponent(IndexComponent);

    // 将fixture的一个组建实例化并赋值给component
    component = fixture.componentInstance;

    // 获取ActivatedRoute后再强制转换为我们实际在RouterTestingModule中提供的ActivatedRouteStub
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;

    // 检测组建变化
    fixture.detectChanges();
  });

  it('should create', () => {
    // 发送数据，触发 C 层的订阅方法
    route.queryParamsSubject.next({});

    // 判断实例化的组建component存在
    expect(component).toBeTruthy();

    // 手动控制MockApi发送数据，消除发送数据的延迟
    getTestScheduler().flush();

    // 自动检测变更
    fixture.autoDetectChanges();
  });
});
