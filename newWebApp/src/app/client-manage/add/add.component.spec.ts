import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponent } from './add.component';
import {FormTest} from '../../testing/FormTest';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Client} from '../../norm/entity/client';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('Client->Add', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let formTest: FormTest<AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComponent ],
      imports: [ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    formTest = new FormTest(fixture);
  });

  /**
   * 断言发起了相关请求
   * 断言在请求的中接收到了对应的值
   */
  const savePostTest = (): void => {
    const httpTestingController: HttpTestingController = TestBed.get(HttpTestingController);
    const req = httpTestingController.expectOne('/client');
    expect(req.request.method).toEqual('POST');
    const client: Client = req.request.body.valueOf();
    expect(client.name).toEqual('testname');
    expect(client.token).toEqual('testtoken');
    expect(client.url).toEqual('testurl');
  };

  /**
   * 1. 向表单中输入值
   * 2. 点击保存按钮
   * 3. 断言输入的值传入到了C层
   */
  it('should create', () => {
    expect(component).toBeTruthy();

    formTest.setInputValue('input[name="name"]', 'testname');
    formTest.setInputValue('input[name="token"]', 'testtoken');
    formTest.setInputValue('input[name="url"]', 'testurl');
    formTest.clickButton('button[type="submit"]');
    fixture.detectChanges();
    expect(component.client.name).toEqual('testname');
    expect(component.client.token).toEqual('testtoken');
    expect(component.client.url).toEqual('testurl');

    savePostTest();
  });

});
