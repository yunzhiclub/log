import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddComponent} from './add.component';
import {AddModule} from './add.module';
import {ApiTestingModule} from '../../../api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {getTestScheduler} from 'jasmine-marbles';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AddModule,
        ApiTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    getTestScheduler().flush();
    fixture.detectChanges();
    fixture.autoDetectChanges();
  });
});
