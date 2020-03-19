import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadnavComponent } from './headnav.component';
import {FormTest} from '../testing/FormTest';
import {TestModule} from '../test/test.module';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from '../service/user.service';
import {of} from 'rxjs';


describe('HeadnavComponent', () => {
  let component: HeadnavComponent;
  let fixture: ComponentFixture<HeadnavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadnavComponent ],
      imports: [RouterTestingModule,
        TestModule
  ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('测试依赖注入', () => {
    const service = TestBed.get(UserService);
    console.log(service);
  });
  it('点击注销按钮', () => {
    spyOn(component, 'onLogout');
    FormTest.clickButton(fixture, 'li button');
    expect(component.onLogout).toHaveBeenCalled();
  });
  it('onLogout', () => {
    const service = TestBed.get(UserService) as UserService;
    console.log(service);
    spyOn(service, 'setIsLogin');
    spyOn(service, 'logout').and.returnValue(of(null));

    component.onLogout();
    expect(service.logout).toHaveBeenCalled();
    expect(service.setIsLogin).toHaveBeenCalledWith(false);
  });
});
