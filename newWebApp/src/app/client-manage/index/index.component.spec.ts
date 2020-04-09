import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClientService} from '../../service/client.service';
import {ClientStubService} from '../../service/client-stub.service';
import {By} from '@angular/platform-browser';
import {FormTest} from '../../testing/FormTest';
import {RouterTestingModule} from '@angular/router/testing';
import {CoreModule} from '../../core/core.module';

describe('Client->Index', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        CoreModule
      ],
      providers: [
        {provide: ClientService, useClass: ClientStubService}
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
    const clientService: ClientStubService = TestBed.get(ClientService);
    const queryParam = clientService.pageParamsCache;

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
    expect(table.rows.item(row).cells.length).toBe(10);
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('1');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('NAME');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('TOKEN');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('http://');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('');
  });
});
