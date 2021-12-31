import {Injectable} from '@angular/core';
import {Menu} from '../entity/menu';
import {Observable, Subscriber} from 'rxjs';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private static readonly menus = [
    {
      name: '用户管理',
      url: 'user',
      icon: 'fa fa-user-cog',
    }
  ] as Menu[];

  constructor(private userService: UserService) {
  }

  public getMenus(): Observable<Menu[]> {
    let subscribe: Subscriber<Menu[]>;
    return new Observable<Menu[]>(s => {
      subscribe = s;
      this.userService.currentLoginUser$.subscribe(
        user => {
          subscribe.next(
            MenuService.menus.filter(menu => {
              let found = true;
              return found;
            })
          );
        }
      );
    });
  }
}
