import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {environment} from '../../environments/environment';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-headnav',
  templateUrl: './headnav.component.html',
  styleUrls: ['./headnav.component.sass']
})
export class HeadnavComponent implements OnInit {
  title: string;
  constructor(private  userService: UserService, private appComponent: AppComponent) { }

  ngOnInit() {
    this.title = environment.title;
  }

  onLogout() {
    this.userService.logout()
      .subscribe(() => {
        this.appComponent.success(() => {
        }, '注销成功');
        this.userService.setIsLogin(false);
      }, () => {
        this.appComponent.error(() => {
        }, '注销失败');
      });
  }
}
