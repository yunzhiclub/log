import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {User} from '../../norm/entity/user';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {AppComponent} from '../../app.component';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
  formGroup: FormGroup;

  user: User;

  constructor(private userService: UserService,
              private router: Router,
              private appComponent: AppComponent) { }

  ngOnInit() {
    this.user = new User();
    this.formGroup = new FormGroup({
      name: new FormControl(''),
      username: new FormControl('')
    });
  }

  onSubmit(): void {
    this.user = this.formGroup.value;
    this.userService.save(this.user).subscribe(() => {
      this.appComponent.success(() => {
        this.router.navigateByUrl('/user');
      }, '用户新增成功');
    }, (res: HttpErrorResponse) => {
      this.appComponent.error(() => {
      }, `用户新增失败:${res.error.message}`);
    });
  }
}
