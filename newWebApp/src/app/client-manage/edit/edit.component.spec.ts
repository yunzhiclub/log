import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import {ActivatedRoute} from '@angular/router';
import SpyObj = jasmine.SpyObj;
import {of} from 'rxjs';
import {ClientService} from '../../service/client.service';
import {By} from '@angular/platform-browser';
import {Client} from '../../norm/entity/client';
import {ActivatedRouteStub} from './activated-route-stub';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';


describe('Client->Edit', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async(() => {
    const studentServiceSpy: SpyObj<ClientService> = jasmine.createSpyObj<ClientService>(['getById', 'update']);
    TestBed.configureTestingModule({
      declarations: [ EditComponent ],
      imports: [ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule],
      providers: [
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
        {provide: ClientService, useValue: studentServiceSpy}
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
    expect(component.client.id).toBeUndefined();
    spyOn(component, 'loadStudentById');

    const activatedRoute: ActivatedRouteStub = TestBed.get(ActivatedRoute);
    const id = Math.floor(Math.random() * 100);
    activatedRoute.subject.next({id});

    expect(component.client.id).toBe(id);
    expect(component.loadStudentById).toHaveBeenCalledWith(id);
  });

  it('通过用户ID调用M层来获取要编辑的用户信息 loadStudentById', () => {
    console.log('测试准备');
    spyOn(component, 'setFormGroupValue');
    const clientServiceSpy: SpyObj<ClientService> = TestBed.get(ClientService);
    const id = Math.floor(Math.random() * 100);
    const mockResultStudent = new Client();
    clientServiceSpy.getById.and.returnValue(of(mockResultStudent));

    console.log('调用方法。并断言参数传值正确，接收返回值正确');
    component.loadStudentById(id);
    expect(clientServiceSpy.getById).toHaveBeenCalledWith(id);
    expect(component.client).toBe(mockResultStudent);
    expect(component.setFormGroupValue).toHaveBeenCalledWith(mockResultStudent);
  });

  it('C层向V层绑定表单是否成功 setFormGroupValue', () => {
    console.log('数据准备及方法调用');
    const client = new Client();
    client.name = Math.random().toString(36).slice(-10);
    client.token = Math.random().toString(36).slice(-10);
    client.url = Math.random().toString(36).slice(-10);

    component.setFormGroupValue(client);

    console.log('重新渲染V层，获取表单的值并进行断言');
    fixture.detectChanges();
    const nameInput: HTMLInputElement = fixture.debugElement.query(By.css('input[name="name"]')).nativeElement;
    expect(nameInput.value).toEqual(client.name);
    const tokenInput: HTMLInputElement = fixture.debugElement.query(By.css('input[name="token"]')).nativeElement;
    expect(tokenInput.value).toEqual(client.token);
    const urlInput: HTMLInputElement = fixture.debugElement.query(By.css('input[name="url"]')).nativeElement;
    expect(urlInput.value).toEqual(client.url);
  });

  it('点击保存按钮', () => {
    spyOn(component, 'onSubmit');
    component.formGroup.get('name').setValue('123');
    component.formGroup.get('token').setValue('123421');
    component.formGroup.get('url').setValue('1234');
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('onSubmit', () => {
    // 设置formGroup的值
    const name = Math.random().toString(36).slice(-10);
    const token = Math.random().toString(36).slice(-10);
    const url = Math.random().toString(36).slice(-10);

    component.formGroup.get('name').setValue(name);
    component.formGroup.get('token').setValue(token);
    component.formGroup.get('url').setValue(url);

    // 设置update方法替身
    spyOn(component, 'update');

    // 调用onSubmit方法
    component.onSubmit();

    // 断言已使用formGroup及班级选择组件的值更新了用户信息
    expect(component.client.name).toBe(name);
    expect(component.client.token).toBe(token);
    expect(component.client.url).toBe(url);

    // 断言调用 向M层传入更新的用户ID及更新的用户信息 方法
    expect(component.update).toHaveBeenCalledWith(component.client);
  });

  it('向M层传入更新的用户ID及更新的用户信息', () => {
    // 在M层对应的方法上建立间谍 （见foreach)
    // 为间谍准备返回值
    const clientService: SpyObj<ClientService> = TestBed.get(ClientService);
    const client = new Client();
    clientService.update.and.returnValue(of(client));

    // 方法调用
    const client1 = new Client();
    client1.id = Math.floor(Math.random() * 100);
    component.update(client1);

    // 断言间谍调用成功，间谍接收参数符合预期
    expect(clientService.update).toHaveBeenCalledWith(client1.id, client1);

    // 断言接收返回值符合预期
    expect(component.client).toBe(client);
  });
});
