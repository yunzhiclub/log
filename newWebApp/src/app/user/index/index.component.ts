import { Component, OnInit } from '@angular/core';
import {User} from '../../norm/entity/user';
import {UserService} from '../../service/user.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {

  /*查询参数*/
  params = {
    page: 0,
    size: 5,
    username: new FormControl(),
    email: new FormControl()
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
    private router: Router) { }

    loadData() {
      const queryParams = {
        page: this.params.page,
        size: this.params.size,
        username: this.params.username.value,
        email: this.params.email.value
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
   * 删除班级
   * @param klass 班级
   */
  onDelete(user: User): void {
    this.userService.deleteById(user.id)
      .subscribe(() => {
        this.pageUser.content.forEach((inUser, key) => {
          if (user === inUser) {
            this.pageUser.content.splice(key, 1);
          }
        });
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
}
