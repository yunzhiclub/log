import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headnav',
  templateUrl: './headnav.component.html',
  styleUrls: ['./headnav.component.sass']
})
export class HeadnavComponent implements OnInit {
  title: string;

  constructor() { }

  ngOnInit() {
    this.title = '日志管理系统';
  }

}
