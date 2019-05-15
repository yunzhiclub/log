import {Component, OnInit} from '@angular/core';
import {MainComponent} from '../main.component';
import {User} from '../../core/entity/User';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../core/service/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
    user: User = new User();

    constructor(
        // private departmentService: DepartmentService,
        private mainComponent: MainComponent,
        private httpClient: HttpClient,
        private userService: UserService
    ) {
    }

    ngOnInit() {
    }

    login() {
        this.httpClient.post('/login/account', this.user).subscribe(
            (user: User) => {
                this.userService.loginUser$.next(user);
            }
        );

    }
}
