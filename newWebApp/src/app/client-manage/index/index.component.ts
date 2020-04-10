import { Component, OnInit } from '@angular/core';
import {Page} from '../../norm/entity/page';
import {Client} from '../../norm/entity/client';
import {ClientService} from '../../service/client.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AppComponent} from '../../app.component';

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
  clientPage = {
    totalPages: 0,
    content: new Page<Client>(null, 0 , 0, 0)
  };

  constructor(private clientService: ClientService,
              private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.clientService.page(this.params).subscribe(
      (clientPage: Page<Client>) => {
        this.clientPage.content = clientPage;
        this.clientPage.totalPages = clientPage.totalPages;
      }
    );
  }

  /**
   * 删除日志
   * @param client 日志
   */
  onDelete(client: Client): void {
    this.appComponent.confirm(() => {
    this.clientService.deleteById(client.id)
      .subscribe((data) => {
        this.load();
        // 操作成功提示
        this.appComponent.success(() => {
        }, '删除成功');
      }, (res: HttpErrorResponse) => {
        // 操作失败提示
        this.appComponent.error(() => {
        }, '删除失败:' + res.error.message);
      });
  }, '即将删除日志');
  }

  onPageSelected(page: number) {
    this.params.page = page;
    this.load();
  }
}
