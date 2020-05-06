import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../service/user.service';
import {AppComponent} from '../app.component';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private userService: UserService, private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit() {
    const username = this.formGroup.get('username').value;
    const password = this.formGroup.get('password').value;
    this.userService.login(username, password).subscribe(result => {
      if (result) {
        this.appComponent.success(() => {
        }, '登录成功');
        this.userService.setIsLogin(true);
      } else {
        this.appComponent.error(() => {
        }, `用户名或密码错误`);
        console.log('用户名密码错误');
      }
    });
  }
}
