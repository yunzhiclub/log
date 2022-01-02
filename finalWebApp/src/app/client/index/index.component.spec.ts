import {ComponentFixture, TestBed} from '@angular/core/testing';
import {IndexComponent} from './index.component';
import {ApiTestingModule} from '../../../api/api.testing.module';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {getTestScheduler} from 'jasmine-marbles';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let route: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexComponent],
      imports: [
        ApiTestingModule,
        RouterTestingModule,
        YzPageModule,
        YzSizeModule,
      ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;

    fixture.detectChanges();
  });

  it('should create', () => {
    // 发送数据，触发 C 层的订阅方法
    route.queryParamsSubject.next({});

    // 判断实例化的组建component存在
    expect(component).toBeTruthy();

    // 手动控制MockApi发送数据，消除发送数据的延迟
    fixture.autoDetectChanges();

    getTestScheduler().flush();

    // 自动检测变更
    fixture.autoDetectChanges();
  });
});
