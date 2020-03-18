import {Observable} from 'rxjs';

export class UserStubService {
  setIsLogin(isLogin: boolean): void {
    return;
  }
  login(username: string, password: string): Observable<boolean> {
    return null;
  }
}
