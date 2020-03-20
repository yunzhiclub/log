import {Observable, of} from 'rxjs';
import {User} from '../../norm/entity/user';

export class UserStubService {
  setIsLogin(isLogin: boolean): void {
    return;
  }
  login(username: string, password: string): Observable<boolean> {
    return null;
  }

  me(): Observable<User> {
    return  of(new User({id: 1, username: 'username', name: 'name', email: 'email' }));
  }
  logout(): Observable<void> {
    return of(null);
  }
}
