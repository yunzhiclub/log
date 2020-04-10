import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.sass']
})
export class PageComponent implements OnInit {

  constructor() { }

  /*查询参数*/
  params = new Array<number>();

  /* 分页数据 */
  pages: Array<number>;

  @Output() selected = new EventEmitter<Array<number>>();

  @Input() set setTotalPages(totalPages: number) {
    this.totalPages = totalPages;
    this.pages = this.makePagesByTotalPages(this.page, totalPages);
    this.params.push(0);
    this.params.push(this.size);
    this.selected.emit(this.params);
  }
  @Input() set setPage(page: number) {
    this.page = page;
    this.pages = this.makePagesByTotalPages(page, this.totalPages);
  }
  // @Input() set setSize(size: number) {
  //   this.size = size;
  //   this.pages = this.makePagesByTotalPages(this.page, this.totalPages);
  // }
  page: number;
  totalPages: number;
  /*在此设置每页大小*/
  size = 10;


  ngOnInit() {
    this.loadData();
  }

  /**
   * 加载数据
   */
  loadData() {
    this.pages = this.makePagesByTotalPages(this.page, this.totalPages);
  }

  onPage(page: number) {
    if (page < 0 || page >= this.totalPages) {
      return ;
    }
    this.params.push(page);
    this.params.push(this.size);
    this.selected.emit(this.params);
    this.loadData();
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

}
