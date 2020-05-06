import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {AppComponent} from '../../app.component';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../../norm/entity/user';

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.sass']
})
export class ModifyPasswordComponent implements OnInit {
  modifyPasswordForm: FormGroup;
  user: User;
  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.initForm();
  }

  /**
   * 初始化表单
   */
  initForm() {
    this.modifyPasswordForm = this.fb.group({
        oldPassword: [null, {
          validators: [Validators.required],
          asyncValidators: [this.userService.oldPasswordValidator()],
          updateOn: 'blur'
        }],
        newPassword: [null, [Validators.required, Validators.minLength(5)]],
        confirmNewPassword: [null, Validators.required]
      }, {validators: this.userService.confirmPasswordValidator},
    );
  }

  submit() {
    this.userService.updatePassword(this.modifyPasswordForm.get('newPassword').value)
      .subscribe(() => {
          this.appComponent.success(() => {
            this.router.navigate(['./../'], {relativeTo: this.route});
          }, '修改密码成功');
      }, (res: HttpErrorResponse) => {
        this.appComponent.error(() => {
        }, `修改密码:${res.error.message}`);
      });
  }
}
