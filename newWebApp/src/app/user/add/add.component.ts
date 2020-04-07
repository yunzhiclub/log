import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {User} from '../../norm/entity/user';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
  formGroup: FormGroup;

  user: User;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.user = new User();
    this.formGroup = new FormGroup({
      name: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl('')
    });
  }

  onSubmit(): void {
    this.user = this.formGroup.value;
    this.userService.save(this.user).subscribe((user: User) => {
      this.router.navigateByUrl('/user');
      console.log(user);
      // this.geToIndex();
    });

  }
}
