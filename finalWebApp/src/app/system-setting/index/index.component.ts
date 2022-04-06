import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SettingValidators} from '../../setting/setting-validators';
import {UserService} from '../../../service/user.service';
import {User} from '../../../entity/user';
import {Client} from '../../../entity/client';
import {Ding} from '../../../entity/ding';
import {CommonService} from '../../../service/common.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  formGroup = new FormGroup({});

  user: User;
  /**
   * form表单关键字
   */
  keys = {
    dingId: 'dingId',
  };

  constructor(private userService: UserService,
              private commonService: CommonService) { }

  ngOnInit(): void {
    this.formGroup.addControl(this.keys.dingId, new FormControl(null, Validators.required));

    // 获取userService中的当前登录用户的webHook
    this.userService.currentLoginUser$
      .subscribe(user => {
        if (user) {
          this.user = user;
          if (user.ding) {
            this.formGroup.get(this.keys.dingId).setValue(user.ding.id)
          }
        }
      })
  }

  /**
   * 点击提交
   * @param formGroup
   */
  onSubmit(formGroup: FormGroup): void {
    const user = {
      ...this.user,
      ding: {
        id:formGroup.get(this.keys.dingId).value as number
      } as Ding
    } as User;
    this.userService.update(this.user.id, user)
      .subscribe(() => {
        this.commonService.success(() => this.commonService.back());
      }, (error) => {
        this.commonService.error(() => {
        }, error)
      });
  }
}
