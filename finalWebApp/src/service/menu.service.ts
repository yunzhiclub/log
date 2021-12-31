import {Injectable} from '@angular/core';
import {Menu} from '../entity/menu';
import {Observable, Subscriber} from 'rxjs';

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
  ] as Menu[]

  constructor() {
  }

  // public getMenus(): Observable<Menu[]> {
  //   let subscribe: Subscriber<Menu[]>
  //   return new Observable<Menu[]>( s => {
  //     subscribe = s;
  //     this.
  //   })
  // }
}
