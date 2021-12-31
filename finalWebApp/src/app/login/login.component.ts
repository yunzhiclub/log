import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {CommonService} from '../../service/common.service';

/**
 * author weiweiyi
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /** 登录表单对象 */
  loginForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private commonService: CommonService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('\\d+')]),
      password: new FormControl('', Validators.required)
    });
  }

  login(): void {
    const user = {
      username: this.loginForm.get('username').value as string,
      password: this.loginForm.get('password').value as string
    };

    this.userService.login(user)
      .subscribe(() => {
        this.userService.initCurrentLoginUser(() => {
          this.router.navigateByUrl('dashboard').then();
        });
      });
  }

}
