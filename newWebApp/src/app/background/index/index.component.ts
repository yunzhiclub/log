import { Component, OnInit } from '@angular/core';
import {Page} from '../../norm/entity/page';
import {Log} from '../../norm/entity/log';
import {LogService} from '../../service/log.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {
  /* 分页数据 */
  pages: Array<number>;
  /* 查询参数 */
  params = {
    page: 0,
    size: 10
  };
  /* 分页数据 */
  logPage = {
    totalPages: 0,
    content: new Page<Log>(null, 0 , 0, 0)
  };

  constructor(private logService: LogService) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.logService.page(this.params).subscribe(
      (logPage: Page<Log>) => {
        this.logPage.content = logPage;
        this.logPage.totalPages = logPage.totalPages;
      }
    );
  }


  onPageSelected(page: number) {
    this.params.page = page;
    this.load();
  }
}

