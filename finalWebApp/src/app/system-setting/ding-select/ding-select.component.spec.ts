import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DingSelectComponent } from './ding-select.component';
import {DingSelectModule} from './ding-select.module';
import {ApiTestingModule} from '../../../api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {getTestScheduler} from 'jasmine-marbles';

describe('DingSelectComponent', () => {
  let component: DingSelectComponent;
  let fixture: ComponentFixture<DingSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        DingSelectModule,
        ApiTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DingSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.autoDetectChanges();
    expect(component).toBeTruthy();
    getTestScheduler().flush();
    fixture.detectChanges();
  });
});
