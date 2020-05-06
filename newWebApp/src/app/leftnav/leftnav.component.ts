import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Router} from '@angular/router';
import {Menu} from '../norm/entity/menu';
import {MenuService} from '../service/menu.service';
import {UserService} from '../service/user.service';
import {isDefined} from '../utils';
import {LogService} from '../service/log.service';
import {ClientService} from '../service/client.service';


@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.css']
})
export class LeftnavComponent implements OnInit, OnDestroy {

  environment = environment;

  menus: Array<Menu>;

  private subscription: Subscription;
  private userSubscription: Subscription;

  constructor(
    private router: Router,
    private menuService: MenuService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.subscription = this.menuService.getAll()
      .subscribe(data => {
          this.menus = [];
          data.forEach((menu) => {
              this.menus.push(menu);
          });
      });
  }

  navigate(menu: Menu): void {
    if (menu.url === 'user') {
       UserService.userNowPage = 0;
    }
    if (menu.url === 'background') {
      LogService.logNowPage = 0;
    }
    if (menu.url === 'client') {
      ClientService.clientNowPage = 0;
    }
    this.router.navigateByUrl(menu.url);
  }

  getBackgroundColor(menu: Menu): string {
    if (this.active(menu)) {
      return environment.color;
    }
  }

  getTextColor(menu: Menu): string {
    if (this.active(menu)) {
      return 'white';
    }
  }

  /**
   * 判断当前菜单是否激活
   * @param menu 菜单
   */
  active(menu: Menu): boolean {
    // 截取/的位置
    const start = this.router.url.indexOf('/');
    const end = this.router.url.indexOf('/', start + 1);

    // 定义主路由
    let mainRoute: string;

    // 根据是否有第2个/选择截取方式
    if (end !== -1) {
      mainRoute = this.router.url.substring(start + 1);
      // console.log('1' + mainRoute);
    } else {
      mainRoute = this.router.url.substring(start + 1, this.router.url.length);
      // console.log('2' + mainRoute);
    }

    // 判断当前路由是否激活
    return mainRoute === menu.url;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
