import {Injectable} from '@angular/core';
import {Menu} from '../entity/menu';
import {Observable, Subscriber} from 'rxjs';
import {UserService} from './user.service';

/**
 * 菜单服务
 * author: liMingAo
 */
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private static readonly menus = [

    {
      name: '日志管理',
      url: 'log',
      icon: 'fa fa-address-book'
    },
    {
      name: '客户端管理',
      url: 'client',
      icon: 'fa fa-house-user'
    },
    {
      name: '机器人设置',
      url: 'setting',
      icon: 'fa fa-cog'
    },
    {
      name: '用户管理',
      url: 'user',
      icon: 'fa fa-user-cog',
    },
    {
      name: '个人中心',
      url: 'personal',
      icon: 'fa fa-user-alt'
    },
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
              /**
               * found 为 true 表示显示此栏菜单，由于目前没有添加user的role属性，默认为全部显示
               */
              let found = true;
              return found;
            })
          );
        }
      );
    });
  }
}
