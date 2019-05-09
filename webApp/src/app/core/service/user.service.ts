import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {User} from '../entity/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    public loginUser$: Subject<User> = new Subject();

    constructor() { }
}
