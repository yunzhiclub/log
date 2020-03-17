import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {User} from '../../norm/entity/User';
import {UserService} from '../../service/user.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
  formGroup: FormGroup;

  user: User;

  constructor(private userService: UserService) { }

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
      console.log(user);
      // this.geToIndex();
    });

  }
}
