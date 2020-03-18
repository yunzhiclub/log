import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-headnav',
  templateUrl: './headnav.component.html',
  styleUrls: ['./headnav.component.sass']
})
export class HeadnavComponent implements OnInit {
  title: string;
  // userService: UserService;
  constructor(private  userService: UserService) { }

  ngOnInit() {
    this.title = '日志管理系统';
  }

  onLogout() {
    this.userService.setIsLogin(false);
  }
}
