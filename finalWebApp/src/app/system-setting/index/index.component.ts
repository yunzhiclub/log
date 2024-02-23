import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {User} from '../../../entity/user';
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
    // 获取userService中的当前登录用户
    this.userService.currentLoginUser$
      .subscribe(user => {
        if (user) {
          this.userService.getById(user.id)
            .subscribe(user => {
              this.user = user;
              if (user.ding) {
                this.formGroup.get(this.keys.dingId).setValue(user.ding.id)
              }
            })
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

  /**
   * 停用该user系统设置的钉钉功能
   * 该钉钉用于推送所有启用的客户端信息
   * @param user 用户
   */
  stopDing(user: User):void {
    this.commonService.confirm((confirm) => {
      if (confirm) {
        this.userService.stopDing(this.user.id)
          .subscribe(() => {
            this.commonService.success(() => this.commonService.back());
          }, (error) => {
            this.commonService.error(() => {
            }, error)
          });
      }
    }, '');

  }
}
