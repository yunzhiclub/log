import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponent } from './add.component';
import {FormTest} from '../../testing/FormTest';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {User} from '../../norm/entity/User';
import {ReactiveFormsModule} from '@angular/forms';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let formTest: FormTest<AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComponent ],
      imports: [ReactiveFormsModule,
        HttpClientTestingModule,
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
    const req = httpTestingController.expectOne('http://localhost:8080/User');
    expect(req.request.method).toEqual('POST');
    const student: User = req.request.body.valueOf();
    expect(student.name).toEqual('testname');
    expect(student.username).toEqual('testusername');
    expect(student.email).toEqual('testemail');
  };

  /**
   * 1. 向表单中输入值
   * 2. 点击保存按钮
   * 3. 断言输入的值传入到了C层
   */
  it('should create', () => {
    expect(component).toBeTruthy();

    formTest.setInputValue('input[name="name"]', 'testname');
    formTest.setInputValue('input[name="username"]', 'testusername');
    formTest.setInputValue('input[name="email"]', 'testemail');
    formTest.clickButton('button[type="submit"]');
    fixture.detectChanges();
    expect(component.user.name).toEqual('testname');
    expect(component.user.username).toEqual('testusername');
    expect(component.user.email).toEqual('testemail');

    savePostTest();
  });

});
