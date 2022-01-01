import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {UserService} from '../../../service/user.service';
import {config} from '../../../conf/app.config';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  /** 登录表单对象 */
  loginForm: FormGroup;
  /** 错误信息 */
  errorInfo: string | undefined;
  /** 提交状态 */
  submitting = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private commonService: CommonService,
              private userService: UserService) {
    /** 创建登录表单 */
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('\\d+')]),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.errorInfo = '';
    // 有变化时重置错误信息
    this.loginForm.valueChanges
      .subscribe(() => {
        this.errorInfo = '';
      });
  }

  login(): void {
    this.submitting = true;
    const user = {
      username: this.loginForm.get('username').value as string,
      password: this.loginForm.get('password').value as string
    };

    this.userService.login(user)
      .subscribe(() => {
        this.userService.initCurrentLoginUser(() => {
          this.router.navigateByUrl('user').then();
        });
      }, (response) => {
        const errorCode = +response.headers.get(config.ERROR_RESPONSE_CODE_KEY);
        const errorMessage = response.headers.get(config.ERROR_RESPONSE_MESSAGE_KEY);
        console.log(`发生错误：${errorCode}, ${errorMessage}`);
        this.errorInfo = '登录失败，请检查您填写的信息是否正确';
        this.submitting = false;
      });
  }

}
