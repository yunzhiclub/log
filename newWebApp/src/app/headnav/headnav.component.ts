import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-headnav',
  templateUrl: './headnav.component.html',
  styleUrls: ['./headnav.component.sass']
})
export class HeadnavComponent implements OnInit {
  title: string;
  constructor(private  userService: UserService) { }

  ngOnInit() {
    this.title = environment.title;
  }

  onLogout() {
    this.userService.logout()
      .subscribe(() => {
        this.userService.setIsLogin(false);
      });
  }
}
