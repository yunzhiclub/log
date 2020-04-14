import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Menu} from '../norm/entity/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() {
  }

  /*在此设置每页大小*/
  public static size = 2;

  private menusSubject = new BehaviorSubject<Array<Menu>>([
    new Menu({name: '首页', url: ''}),
    new Menu({name: '客户端管理', url: 'client'}),
    new Menu({name: '后台日志管理', url: 'background'}),
    new Menu({name: '用户管理', url: 'user'}),
    new Menu({name: '系统设置', url: 'setting'}),
    new Menu({name: '个人中心', url: 'personalCenter'})

  ]);

  getAll(): Observable<Array<Menu>> {
    return this.menusSubject.asObservable();
  }

  addMenu(menu: Menu) {
    const menus = this.menusSubject.value;
    menus.push(menu);
    this.menusSubject.next(menus);
  }
}
