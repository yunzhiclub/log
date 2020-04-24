import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import {By} from '@angular/platform-browser';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {UserStubService} from '../../service/user-stub.service';
import {UserService} from '../../service/user.service';
import {AppTestingModule} from '../../app-testing/app-testing.module';
import {CoreTestingController} from '../../core/core-testing/core-testing-controller';
import {PageComponent} from '../../core/core-testing/page/page.component';
import {CoreTestingModule} from '../../core/core-testing/core-testing.module';

describe('user -> IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexComponent ],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule, AppTestingModule, ReactiveFormsModule, CoreTestingModule],
      providers: [
        CoreTestingController,
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
    expect(table.rows.item(row).cells.length).toBe(4);

    expect(table.rows.item(row).cells.item(col++).innerText).toBe('1');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('testUser');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('testusername');
    expect(table.rows.item(row).cells.item(col++).innerText).toBe('编辑删除重置密码');
  });

  it('选择页数组件', function() {
    const controller = TestBed.get(CoreTestingController) as CoreTestingController;
    const sizeComponent = controller.get(PageComponent) as PageComponent;
    expect(sizeComponent.setPage).toBe(component.params.page);
    expect(sizeComponent.setSize).toBe(component.params.size);
    expect(sizeComponent.setTotalPages).toBe(component.pageUser.totalPages);

    spyOn(component, 'onPageSelected');
    spyOn(component, 'onSizeSelected');
    sizeComponent.selectedPage.emit(3);
    sizeComponent.selectedSize.emit(4);
    expect(component.onPageSelected).toHaveBeenCalledWith(3);
    expect(component.onSizeSelected).toHaveBeenCalledWith(4);

  });

});
