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
        this.pages = this.makePagesByTotalPages(this.params.page, clientPage.totalPages);
      }
    );
  }

  /**
   * 点击分页按钮
   * @param page 要请求的页码
   */
  onPage(page: number) {
    if (page === -1 || page === this.clientPage.totalPages) {
      return;
    } else {
      this.params.page = page;
      this.load();
    }

  }

  /**
   * 生成页码
   * @param begin 开始页码
   * @param end 结束页码
   */
  makePages(begin: number, end: number): Array<number> {
    const result = new Array<number>();
    for (; begin <= end; begin++) {
      result.push(begin);
    }
    return result;
  }
  /**
   * 生成分页数据
   * @param currentPage 当前页
   * @param totalPages 总页数
   */
  makePagesByTotalPages(currentPage: number, totalPages: number): Array<number> {
    if (totalPages > 0) {
      /* 总页数小于5 */
      if (totalPages <= 5) {
        return this.makePages(0, totalPages - 1);
      }

      /* 首2页 */
      if (currentPage < 2) {
        return this.makePages(0, 4);
      }

      /* 尾2页 */
      if (currentPage > totalPages - 3) {
        return this.makePages(totalPages - 5, totalPages - 1);
      }

      /* 总页数大于5，且为中间页码*/
      return this.makePages(currentPage - 2, currentPage + 2);
    }

    return new Array();
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
}
