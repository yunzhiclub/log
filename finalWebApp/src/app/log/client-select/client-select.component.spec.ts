import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ClientSelectComponent} from './client-select.component';
import {ClientSelectModule} from './client-select.module';
import {ApiTestingModule} from '../../../api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';
import {getTestScheduler} from 'jasmine-marbles';

describe('ClientSelectComponent', () => {
  let component: ClientSelectComponent;
  let fixture: ComponentFixture<ClientSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ClientSelectModule,
        ApiTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSelectComponent);
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
