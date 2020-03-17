import { Component, OnInit } from '@angular/core';
import {Page} from '../../norm/entity/Page';
import {Log} from '../../norm/entity/Log';
import {LogService} from '../../service/log.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {
  /* 查询参数 */
  params = {
    page: 0,
    size: 20
  };

  /* 分页数据 */
  logPage: Page<Log> = new Page<Log>();
  constructor(private logService: LogService) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.logService.page(this.params).subscribe(
      (logPage: Page<Log>) => {
        this.logPage = logPage;
      }
    );
  }
}

