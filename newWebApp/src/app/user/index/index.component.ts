import { Component, OnInit } from '@angular/core';
import {User} from '../../norm/entity/User';
import {UserService} from '../../service/user.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {
  private url = 'http://localhost:8080/Klass';
  users;
  /*查询参数*/
  params = {
    name: ''
  };

  constructor(
    private userService: UserService,
    private httpClient: HttpClient) { }

  ngOnInit() {
    this.onQuery();
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
  onQuery(): void {
    console.log('执行onQuery');
    this.httpClient.get(this.url, {params: this.params})
      .subscribe(data => {
        console.log('成功执行请求', data);
        this.users = data;
      }, () => {
        console.log(`请求${this.url}发生错误`);
      });
  }
}
