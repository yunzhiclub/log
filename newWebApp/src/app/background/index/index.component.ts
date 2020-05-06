import { Component, OnInit } from '@angular/core';
import {Page} from '../../norm/entity/page';
import {Log} from '../../norm/entity/log';
import {LogService} from '../../service/log.service';
import {MenuService} from '../../service/menu.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Client} from '../../norm/entity/client';

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
    page: LogService.logNowPage,
    size: MenuService.size,
    message: new FormControl(),
    level: undefined,
    client: new Client()
  };
  /* 分页数据 */
  logPage = {
    totalPages: 0,
    content: new Page<Log>(null, 0 , 0, 0)
  };
  logForm: FormGroup;
  constructor(private builder: FormBuilder, private logService: LogService) {
  }

  ngOnInit() {
    this.createForm();
    this.load();
  }

  createForm() {
    this.logForm = this.builder.group({
    });
  }

  load() {
    const queryParams = {
      page: this.params.page,
      size: this.params.size,
      message: this.params.message ? this.params.message.value : undefined,
      level: this.params.level,
      clientId: this.params.client ? this.params.client.id : undefined
    };
    this.logService.page(queryParams).subscribe(
      (logPage: Page<Log>) => {
        this.logPage.content = logPage;
        this.logPage.totalPages = logPage.totalPages;
      }
    );
  }

  /* 查询 */
  onQuery() {
    this.load();
  }

  clear() {
    this.params.message.setValue(null);
    this.params.level = undefined;
    this.params.client = new Client();
    this.load();
  }

  onPageSelected(page: number) {
    LogService.logNowPage = page;
    this.params.page = page;
    this.load();
  }

  /**
   * 单选框被用户点击时
   * @param $event 弹射值
   * @param level 等级
   */
  onCheckBoxChange($event: Event, level: number) {
    switch (level) {
      case 0: this.params.level = undefined; break;
      case 1: this.params.level = 'DEBUG'; break;
      case 2: this.params.level = 'TRACE'; break;
      case 3: this.params.level = 'INFO'; break;
      case 4: this.params.level = 'WARN'; break;
      case 5: this.params.level = 'ERROR'; break;
    }
    this.load();
  }

  /* 选择班级 */
  onSelectKlass(client: Client) {
    this.params.client = client;
    this.load();
  }

  onSizeSelected(size: number) {
    this.params.size = MenuService.size = size;
    this.load();
  }
}

