import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IndexComponent} from './index.component';
import {IndexModule} from "./index.module";
import {ApiTestingModule} from "../../../api/api.testing.module";
import {ActivatedRouteStub, RouterTestingModule} from "@yunzhi/ng-router-testing";
import {getTestScheduler} from "jasmine-marbles";
import {ActivatedRoute} from "@angular/router";

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let route: ActivatedRouteStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexComponent],
      imports: [
        IndexModule,
        ApiTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
  });

  fit('should create', () => {
    route.queryParamsSubject.next({});
    expect(component).toBeTruthy();
    getTestScheduler().flush();
    fixture.detectChanges();
    fixture.autoDetectChanges();
  });
});
