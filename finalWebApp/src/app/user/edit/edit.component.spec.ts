import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EditComponent} from './edit.component';
import {EditModule} from './edit.module';
import {ActivatedRouteStub, RouterStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiTestingModule} from '../../../api/api.testing.module';
import {getTestScheduler} from 'jasmine-marbles';

describe('UserEditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let route: ActivatedRouteStub;
  let router: RouterStub;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        EditModule,
        ApiTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router) as unknown as RouterStub;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    route.paramsSubject.next({id: 1});
    getTestScheduler().flush();
    fixture.autoDetectChanges();
    expect(component).toBeTruthy();
  });
});
