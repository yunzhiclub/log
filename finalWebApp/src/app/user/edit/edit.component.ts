import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../entity/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {CommonService} from '../../../service/common.service';
import {Assert} from '@yunzhi/utils/build/src';
import {UsernameValidator} from "../add/username-validator";
import {UserAsyncValidators} from "../add/user-async-validators";


/**
 * 用户管理编辑
 * author: liMingAo
 */
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private commonService: CommonService,
              private userAsyncValidators: UserAsyncValidators) {
  }

  formGroup = new FormGroup({});
  /**
   * form表单关键字
   */
  formKeys = {
    id: 'id',
    name: 'name',
    username: 'username',
    email: 'email'
  };
  user = {} as User;
  /**
   * 用户名是否变化
   */
  isUsernameChange = false;

  loadById(id: number): void {
    this.userService.getById(id)
      .subscribe((user: User) => {
        this.setUser(user);
      }, (error: any) => console.log(error));
  }

  setUser(user: User): void {
    this.user = user;
    Assert.isDefined(user, self.name + ' user must be defined');
    Assert.isDefined(user.username, user.password + ' user validate fail');
    this.formGroup.get(this.formKeys.name).setValue(user.name);
    this.formGroup.get(this.formKeys.username).setValue(user.username);
    this.formGroup.get(this.formKeys.email).setValue(user.email);
    this.formGroup.get(this.formKeys.id).setValue(user.id);
  }

  initFormControl(): void {
    const formControlUsername = new FormControl('',
      [Validators.required, UsernameValidator.username],this.userAsyncValidators.userNotExist());
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.username, formControlUsername);
    this.formGroup.addControl(this.formKeys.email, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.id, new FormControl('', Validators.required));
  }

  ngOnInit(): void {
    this.initFormControl();
    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isNumber(id, 'id must be number');
      this.loadById(+id);
    });
  }

  onSubmit(formGroup: FormGroup): void {
    const id = this.formGroup.get(this.formKeys.id).value;
    const user = {
      id,
      name: formGroup.get(this.formKeys.name).value as string,
      username: formGroup.get(this.formKeys.username).value as string,
      email: formGroup.get(this.formKeys.email).value as string
    } as User;
    this.userService.update(id, user)
      .subscribe(() => {
        this.commonService.success(() => this.commonService.back());
      }, (error) => {
        this.commonService.error(() => {
        }, error)
      });
  }
}
