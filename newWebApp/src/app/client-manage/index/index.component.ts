import { Component, OnInit } from '@angular/core';
import {Page} from '../../norm/entity/page';
import {Client} from '../../norm/entity/client';
import {ClientService} from '../../service/client.service';

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

  constructor(private clientService: ClientService) {
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
   * 删除班级
   * @param klass 班级
   */
  onDelete(client: Client): void {
    this.clientService.deleteById(client.id)
      .subscribe((data) => {
        this.load();
      });
  }

  onPageSelected(page: number) {
    this.params.page = page;
    this.load();
  }
}
