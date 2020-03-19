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
    size: 2,
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
          this.pages = this.makePagesByTotalPages(this.params.page, response.totalPages);
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
    this.userService.deleteById(user.id);
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

  onPage(page: number) {
    if (page < 0 || page >= this.pageUser.totalPages) {
      return;
    }
    this.params.page = page;
    this.loadData();
  }

  /**
   * 生成分页数据
   * @param currentPage 当前页
   * @param totalPages 总页数
   */
  makePagesByTotalPages(currentPage: number, totalPages: number): Array<number> {
    if (totalPages > 0) {
      /* 总页数小于5 */
      if (totalPages <= 5) {
        return this.makePages(0, totalPages - 1);
      }

      /* 首2页 */
      if (currentPage < 2) {
        return this.makePages(0, 4);
      }

      /* 尾2页 */
      if (currentPage > totalPages - 3) {
        return this.makePages(totalPages - 5, totalPages - 1);
      }

      /* 总页数大于5，且为中间页码*/
      return this.makePages(currentPage - 2, currentPage + 2);
    }

    return new Array();
  }

  makePages(begin: number, end: number): Array<number> {
    const result = new Array<number>();
    for (; begin <= end; begin++) {
      result.push(begin);
    }
    return result;
  }
}
