import {Component, OnInit} from '@angular/core';
import {User} from '../../entity/user';
import {UserService} from '../../service/user.service';
import {Assert} from '@yunzhi/utils/build/src';

/**
 * 个人中心
 * @author liguowen
 */
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  user = new User();

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    // 获取userService中的当前登录用户
    this.userService.currentLoginUser$
      .subscribe(user => {
        if (user) {
          Assert.isNotNullOrUndefined(user.name, 'name must be exist');
          Assert.isNotNullOrUndefined(user.username, 'username must be exit');
          this.user = user;
        }
      })
  }

}
