import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import {ApiTestingModule} from '../../../api/api.testing.module';
import {ActivatedRouteStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {IndexModule} from './index.module';
import {ActivatedRoute} from '@angular/router';
import {getTestScheduler} from 'jasmine-marbles';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let route: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        IndexModule,
        ApiTestingModule,
        RouterTestingModule,
      ]
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
    route.queryParamsSubject.next({});
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
    getTestScheduler().flush();
    fixture.autoDetectChanges();
  });
});
