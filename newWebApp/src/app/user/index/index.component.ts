import {Component, OnInit} from '@angular/core';
import {User} from '../../norm/entity/user';
import {UserService} from '../../service/user.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';
import {FormControl} from '@angular/forms';
import {MenuService} from '../../service/menu.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {

  /*查询参数*/
  params = {
    page: UserService.userNowPage,
    size: MenuService.size,
    username: new FormControl()
  };
  /*分页数据*/
  pageUser = {
    totalPages: 0,
    content: new Array<User>()
  };
  /*分页数据*/
  pages: Array<number>;

  constructor(
    private userService: UserService,
    private httpClient: HttpClient,
    private appComponent: AppComponent,
    private router: Router) {
  }

  loadData() {
    const queryParams = {
      page: this.params.page,
      size: MenuService.size,
      username: this.params.username.value
    };

    this.userService.page(queryParams)
      .subscribe((response: { totalPages: number, content: Array<User> }) => {
        this.pageUser = response;
      });
  }

  ngOnInit() {
    this.loadData();
  }

  /**
   * 删除用户
   * @param User 用户
   */
  onDelete(user: User): void {
    this.userService.deleteById(user.id)
      .subscribe(() => {
        this.appComponent.success(() => {
          this.pageUser.content.forEach((inUser, key) => {
            if (user === inUser) {
              this.pageUser.content.splice(key, 1);
            }
          });
        }, '用户删除成功');
      }, (res: HttpErrorResponse) => {
        this.appComponent.error(() => {
        }, `用户删除失败:${res.error.message}`);
      });
  }

  /**
   * 用户点击查询按钮后触发
   */
  onQuery(): void {
    this.loadData();
  }

  onPageSelected(page: number) {
    this.params.page = page;
    UserService.userNowPage = page;
    this.loadData();
  }

  resetPassword(id: number) {
    this.userService.resetPassword(id)
      .subscribe(() => {
        this.appComponent.success(() => {
          this.router.navigateByUrl('/user');
        }, '密码重置成功');
      }, (res: HttpErrorResponse) => {
        this.appComponent.error(() => {
        }, `密码重置失败:${res.error.message}`);
      });
  }

  clear() {
    this.params.username.setValue(null);
    this.ngOnInit();
  }
  onSizeSelected(size: number) {
    MenuService.size = size;
    this.loadData();
  }
}
