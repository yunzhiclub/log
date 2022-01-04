import {Injectable} from '@angular/core';
import {BasicService} from '@yunzhi/ng-theme';
import {MenuService} from './menu.service';
import {Router} from '@angular/router';
import {CommonService} from './common.service';
import {UserService} from './user.service';
import {Observable} from 'rxjs';
import {User} from '../entity/user';

/**
 * 主题服务
 * author: liMingAo
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService extends BasicService {
  constructor(private menuService: MenuService,
              private router: Router,
              private commonService: CommonService,
              private userService: UserService) {
    super();
  }

  back() {
    this.commonService.back();
  }

  getMenus(): Observable<{
    name: string;
    url: string;
    icon: string;
  }[]> {
    return this.menuService.getMenus();
  }

  isShowBack$() {
    return this.commonService.canBack();
  }

  logout() {
    this.userService.logout().subscribe();
  }

}
