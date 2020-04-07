import { Component, OnInit } from '@angular/core';
import {User} from '../../norm/entity/user';
import {UserService} from '../../service/user.service';
import {HttpClient} from '@angular/common/http';
import {FormControl} from '@angular/forms';

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
    name: '',
    username: '',
    email: ''
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
    private httpClient: HttpClient) { }

    loadData() {
      const queryParams = {
        page: this.params.page,
        size: this.params.size,
        name: this.params.name,
        username: this.params.username,
        email: this.params.email
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
  // onQuery(): void {
  //   console.log('执行onQuery');
  //   this.httpClient.get(this.url, {params: this.params})
  //     .subscribe(data => {
  //       console.log('成功执行请求', data);
  //       this.users = data;
  //     }, () => {
  //       console.log(`请求${this.url}发生错误`);
  //     });
  // }

  onPageSelected(page: number) {
    this.params.page = page;
    this.loadData();
  }
}
