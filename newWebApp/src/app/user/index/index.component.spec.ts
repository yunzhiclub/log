import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {User} from '../../norm/entity/user';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {UserStubService} from '../../service/user-stub.service';
import {UserService} from '../../service/user.service';
import {FormTest} from '../../testing/FormTest';
import {AppModule} from '../../app.module';
import {CoreModule} from '../../core/core.module';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexComponent ],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule, CoreModule, ReactiveFormsModule],
      providers: [
        {provide: UserService, useClass: UserStubService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('组件初始化发起请求测试', () => {
    /* 获取请求参数 */
    const userService: UserStubService = TestBed.get(UserService);
    const queryParam = userService.pageParamsCache;

    /* 断言传入的参数值与组件中的参数值相同 */

    expect(queryParam.page).toEqual(component.params.page);
    expect(queryParam.size).toEqual(component.params.size);
  });


  it('组件初始化V层渲染', () => {
    /* 获取table元素 */
    const tableElement = fixture.debugElement.query(By.css('table'));
    const table: HTMLTableElement = tableElement.nativeElement;

    /* 断言总行数及第一行的内容绑定符合预期 */
    const row = 1;
    let col = 0;
    expect(table.rows.length).toBe(3);
    expect(table.rows.item(row).cells.length).toBe(5);

    expect(table.rows.item(row).cells.item(col++).innerText).toBe('1');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('testUser');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('testusername');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('testemail');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('编辑删除');
  });

});
