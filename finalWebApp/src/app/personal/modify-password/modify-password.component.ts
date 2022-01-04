import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.css']
})
export class ModifyPasswordComponent implements OnInit {

  formGroup: FormGroup;
  submit = false;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private commonService: CommonService,
              private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      oldPassword: [null, {
        validators: [Validators.required],
        asyncValidators: [this.userService.oldPasswordValidator()],
        updateOn: 'blur'
      }],
      newPassword: [null, [Validators.required]],
      confirmNewPassword:  [null, Validators.required]
    }, {validators: this.userService.confirmPasswordValidator})
  }

  onSubmit(): void {
    this.submit = true;
    this.userService.updatePassword(this.formGroup.get('newPassword').value,
      this.formGroup.get('oldPassword').value)
      .subscribe(() => {
        this.userService.logout()
          .subscribe(() => {
          }, error => {
          }, () => {
            this.commonService.success(() => {
              this.router.navigateByUrl('login').then();
            });
          });
      });
  }

}
