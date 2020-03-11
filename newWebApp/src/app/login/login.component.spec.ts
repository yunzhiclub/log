import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormTest} from '../testing/FormTest';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserService} from '../service/user.service';
import {of} from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('表单绑定', () => {
    // 设置C层的值后重新渲染V层
    component.formGroup.get('username').setValue('testUsername');
    component.formGroup.get('password').setValue('testPassword');
    fixture.detectChanges();

    // 获取V层的值
    const usernameValue = FormTest.getInputValueByFixtureAndCss(fixture, '#username');
    const passwordValue = FormTest.getInputValueByFixtureAndCss(fixture, '#password');

    // 断言CV两层的值相等
    expect(usernameValue).toEqual('testUsername');
    expect(passwordValue).toEqual('testPassword');
  });
  it('点击提交按钮', () => {
    spyOn(component, 'onSubmit');
    FormTest.clickButton(fixture, 'button');
    expect(component.onSubmit).toHaveBeenCalledWith();
  });
  fit('onSubmit', () => {
    // 获取teacherService实例，并为其login方法设置替身
    const teacherService = TestBed.get(UserService) as UserService;
    spyOn(teacherService, 'login').and.returnValue(of(true));
    spyOn(console, 'log');

    // 添加测试数据并调用
    component.formGroup.get('username').setValue('testUsername');
    component.formGroup.get('password').setValue('testPassword');
    component.onSubmit();

    // 断言成功调用teacherService的login方法
    expect(teacherService.login).toHaveBeenCalledWith('testUsername', 'testPassword');
    expect(console.log).toHaveBeenCalledWith(true);
  });
});
