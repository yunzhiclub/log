import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EditComponent} from './edit.component';
import {EditModule} from './edit.module';
import {HttpClientModule} from '@angular/common/http';
import {ActivatedRouteStub, RouterStub, RouterTestingModule} from '@yunzhi/ng-router-testing';
import {ActivatedRoute, Router} from '@angular/router';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let route: ActivatedRouteStub;
  let router: RouterStub;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        EditModule,
        HttpClientModule
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
    fixture.autoDetectChanges();
    expect(component).toBeTruthy();
  });
});
