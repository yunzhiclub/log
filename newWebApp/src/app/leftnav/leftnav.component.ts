import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.sass']
})
export class LeftnavComponent implements OnInit {

  /*标题*/
  title: string;
  /*菜单项*/
  menus = new Array<{ url: string; name: string }>();

  constructor() {
  }

  ngOnInit() {
    this.title = '日志管理系统';
    this.menus.push({url: 'client', name: '客户端管理'});
    this.menus.push({url: 'background', name: '后台日志管理'});
    this.menus.push({url: '', name: '菜单3'});
  }

}
