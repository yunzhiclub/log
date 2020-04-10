import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import {ActivatedRoute} from '@angular/router';
import SpyObj = jasmine.SpyObj;
import {of} from 'rxjs';
import {UserService} from '../../service/user.service';
import {By} from '@angular/platform-browser';
import {User} from '../../norm/entity/user';
import {ActivatedRouteStub} from './activated-route-stub';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppTestingModule} from '../../app-testing/app-testing.module';


describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async(() => {
    const studentServiceSpy: SpyObj<UserService> = jasmine.createSpyObj<UserService>(['getById', 'update']);
    TestBed.configureTestingModule({
      declarations: [ EditComponent ],
      imports: [ReactiveFormsModule,
      HttpClientTestingModule,
        RouterTestingModule,
        AppTestingModule],
      providers: [
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
        {provide: UserService, useValue: studentServiceSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('通过路由获取要编辑的用户ID', () => {
    expect(component.user.id).toBeUndefined();
    spyOn(component, 'loadStudentById');

    const activatedRoute: ActivatedRouteStub = TestBed.get(ActivatedRoute);
    const id = Math.floor(Math.random() * 100);
    activatedRoute.subject.next({id});

    expect(component.user.id).toBe(id);
    expect(component.loadStudentById).toHaveBeenCalledWith(id);
  });

  it('通过用户ID调用M层来获取要编辑的用户信息 loadStudentById', () => {
    console.log('测试准备');
    spyOn(component, 'setFormGroupValue');
    const userServiceSpy: SpyObj<UserService> = TestBed.get(UserService);
    const id = Math.floor(Math.random() * 100);
    const mockResultStudent = new User();
    userServiceSpy.getById.and.returnValue(of(mockResultStudent));

    console.log('调用方法。并断言参数传值正确，接收返回值正确');
    component.loadStudentById(id);
    expect(userServiceSpy.getById).toHaveBeenCalledWith(id);
    expect(component.user).toBe(mockResultStudent);
    expect(component.setFormGroupValue).toHaveBeenCalledWith(mockResultStudent);
  });

  it('C层向V层绑定表单是否成功 setFormGroupValue', () => {
    console.log('数据准备及方法调用');
    const user = new User();
    user.name = Math.random().toString(36).slice(-10);
    user.username = Math.random().toString(36).slice(-10);
    user.email = Math.random().toString(36).slice(-10);

    component.setFormGroupValue(user);

    console.log('重新渲染V层，获取表单的值并进行断言');
    fixture.detectChanges();
    const nameInput: HTMLInputElement = fixture.debugElement.query(By.css('input[name="name"]')).nativeElement;
    expect(nameInput.value).toEqual(user.name);
    const usernameInput: HTMLInputElement = fixture.debugElement.query(By.css('input[name="username"]')).nativeElement;
    expect(usernameInput.value).toEqual(user.username);
    const emailInput: HTMLInputElement = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
    expect(emailInput.value).toEqual(user.email);
  });

  it('点击保存按钮', () => {
    spyOn(component, 'onSubmit');
    component.formGroup.get('name').setValue('123');
    component.formGroup.get('username').setValue('123421');
    component.formGroup.get('email').setValue('1234');
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('onSubmit', () => {
    // 设置formGroup的值
    const name = Math.random().toString(36).slice(-10);
    const username = Math.random().toString(36).slice(-10);
    const email = Math.random().toString(36).slice(-10);

    component.formGroup.get('name').setValue(name);
    component.formGroup.get('username').setValue(username);
    component.formGroup.get('email').setValue(email);

    // 设置update方法替身
    spyOn(component, 'update');

    // 调用onSubmit方法
    component.onSubmit();

    // 断言已使用formGroup及班级选择组件的值更新了用户信息
    expect(component.user.name).toBe(name);
    expect(component.user.username).toBe(username);
    expect(component.user.email).toBe(email);

    // 断言调用 向M层传入更新的用户ID及更新的用户信息 方法
    expect(component.update).toHaveBeenCalledWith(component.user);
  });

  it('向M层传入更新的用户ID及更新的用户信息', () => {
    // 在M层对应的方法上建立间谍 （见foreach)
    // 为间谍准备返回值
    const userService: SpyObj<UserService> = TestBed.get(UserService);
    const user = new User();
    userService.update.and.returnValue(of(user));

    // 方法调用
    const user1 = new User();
    user1.id = Math.floor(Math.random() * 100);
    component.update(user1);

    // 断言间谍调用成功，间谍接收参数符合预期
    expect(userService.update).toHaveBeenCalledWith(user1.id, user1);

    // 断言接收返回值符合预期
    expect(component.user).toBe(user);
  });
});
