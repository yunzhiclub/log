import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from '../norm/entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserStubService {
  /* 传入参数缓存 */
  pageParamsCache: { username?: string, name?: string, page?: number, size?: number };

  constructor() { }

  /**
   * page模拟方法
   * @param params 查询参数
   */
  page(params: { username?: string, name?: string, page?: number, size?: number })
    : Observable<{ totalPages: number, content: Array<User> }> {
    this.pageParamsCache = params;
    const mockResult = {
      totalPages: 100,
      content: new Array<User>(
        new User({id: 1, name: 'testUser', username: 'testusername'}),
        new User({id: 2, name: 'testUser1', username: 'testusername1'}))
    };
    return of(mockResult);
  }

  deleteById(id: number) {
  }
  updatePassword(newPassword: string) {
   newPassword = 'newPassword';
  }
}
