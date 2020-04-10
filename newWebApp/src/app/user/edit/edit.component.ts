import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {User} from '../../norm/entity/user';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {AppComponent} from '../../app.component';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  formGroup: FormGroup;
  user: User = new User();

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private appComponent: AppComponent) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((param: { id: number }) => {
      this.user.id = param.id;
      this.loadStudentById(this.user.id);
    });
    this.formGroup = new FormGroup({
      name: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl('')
    });

  }

  onSubmit() {
    this.user.name = this.formGroup.get('name').value;
    this.user.username = this.formGroup.get('username').value;
    this.user.email = this.formGroup.get('email').value;
    this.update(this.user);
  }

  update(user: User) {
    this.userService.update(user.id, user)
      .subscribe((result) => {
        this.appComponent.success(() => {
        this.router.navigateByUrl('/user');
        this.user = result;
        // this.linkToIndex.nativeElement.click();
        }, '用户信息更新成功');
      }, (res: HttpErrorResponse) => {
        this.appComponent.error(() => {
        }, `用户信息更新失败:${res.error.message}`);
      });
  }

  /**
   * 加载用户
   * @param id 用户ID
   */
  loadStudentById(id: number) {
    this.userService.getById(id)
      .subscribe(user => {
        this.user = user;
        this.setFormGroupValue(this.user);
      });
  }

  /**
   * 设置表单值
   * @param user 用户
   */
  setFormGroupValue(user: User) {
    this.formGroup.setValue({
      name: user.name,
      username: user.username,
      email: user.email,
    });
  }
}
