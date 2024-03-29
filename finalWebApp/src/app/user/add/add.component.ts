import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../entity/user';
import {UsernameValidator} from './username-validator';
import {UserAsyncValidators} from "./user-async-validators";

/**
 * 用户管理新增
 */

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private commonService: CommonService,
              private userAsyncValidators: UserAsyncValidators) {
  }

  beExit = false;
  formGroup = new FormGroup({});
  /**
   * form表单关键字
   */
  formKeys = {
    name: 'name',
    username: 'username',
    email: 'email'
  };
  user = {} as User;

  initFormControl(): void {
    const formControlUsername = new FormControl('',
      [Validators.required, UsernameValidator.username], this.userAsyncValidators.userNotExist());
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.username, formControlUsername);
    this.formGroup.addControl(this.formKeys.email, new FormControl('', Validators.email));
  }

  ngOnInit(): void {
    this.initFormControl();
  }

  onSubmit(formGroup: FormGroup): void {
    const user = {
      name: formGroup.get(this.formKeys.name).value as string,
      username: formGroup.get(this.formKeys.username).value as string,
      email: formGroup.get(this.formKeys.email).value as string
    } as User;
    this.userService.save(user)
      .subscribe(string => {
          this.commonService.success(() => {
            this.commonService.back();
          }, '', '操作成功，密码为' + string)
        }, error => {
          this.commonService.error(() => {
          }, '数据更新失败')
        },
      );
  }

}

