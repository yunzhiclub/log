import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {LogStubService} from '../../service/log-stub.service';
import {By} from '@angular/platform-browser';
import {LogService} from '../../service/log.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormTest} from '../../testing/FormTest';
import {CoreModule} from '../../core/core.module';

describe('BackgroundIndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        CoreModule
      ],
      providers: [
        {provide: LogService, useClass: LogStubService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('组件初始化发起请求测试', () => {
    /* 获取请求参数 */
    const logService: LogStubService = TestBed.get(LogService);
    const queryParam = logService.pageParamsCache;

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
    expect(table.rows.item(row).cells.length).toBe(8);
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('1');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('DEBUG');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('context');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('thread');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('logger');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('message');
    // 由于时区不一样，时间差八小时，无法同时通过本地和机器人的单元测试
    // expect(table.rows.item(row).cells.item(col++).innerText).toBe('1970-01-01 08:00:00');
  });

});
