import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Page} from '@yunzhi/ng-common';
import {FormControl, FormGroup} from '@angular/forms';
import {getDefaultWhenValueIsInValid} from '@yunzhi/utils';
import {Assert} from '@yunzhi/utils/build/src';
import {Log} from '../../entity/log';
import {CommonService} from '../../service/common.service';
import {config} from '../../conf/app.config';
import {LogService} from '../../service/log.service';

/**
 * 日志管理首页
 */
@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  keys = {
    page: 'page',
    size: 'size',
    clientId: 'clientId',
    message: 'message',
    level: 'level'
  };
  pageData = {} as Page<Log>;
  params: Params;
  queryForm = new FormGroup({});

  constructor(private commonService: CommonService,
              private logService: LogService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initQueryForm();
    // 订阅参数变化
    this.route.queryParams.subscribe((params: {page?: string, size?: string}) => {
      // 缓存查询参数
      this.params = params;
      getDefaultWhenValueIsInValid(params[this.keys.page], '0');
      getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString());

      // 发起查询
      this.logService.page(
        // 调用stringToIntegerNumber将查询的字符串转为number
        getDefaultWhenValueIsInValid(params[this.keys.page], '0'),
        getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString()),
        {
          clientId: params[this.keys.clientId],
          level: params[this.keys.level],
          message: params[this.keys.message]
        },
      ).subscribe(page => {
        this.validateData(page);
        this.pageData = page;
      });
    });
  }

  /**
   * 点击分页
   * @param page 当前页
   */
  onPageChange(page: number): void {
    this.reload({...this.params, ...{page}});
  }

  /**
   * 点击改变每页大小
   * @param size 每页大小
   */
  onSizeChange(size: number): void {
    this.reload({...this.params, ...{size}});
  }

  onSubmit(queryForm: FormGroup): void {
    this.reload({...this.params, ...queryForm.value});
  }

  /**
   * 查询
   * @param params page: 当前页 size: 每页大小
   */
  reload(params: Params): void {
    // 将参数转换为路由参数
    const queryParams = CommonService.convertToRouteParams(params);
    console.log(params);
    this.router.navigate(['./'],
      {
        relativeTo: this.route,
        queryParams: queryParams,
      }).then();
  }

  /**
   * 校验数据是否满足前台列表的条件
   * @param data 分页数据
   */
  validateData(data: Page<Log>): void {
    data.content.forEach(v => this.validateLog(v));
    this.pageData = data;
  }


  /**
   * 校验字段是否符合V层表现
   */
  validateLog(log: Log): void {
    // 必有条件
    Assert.isNotNullOrUndefined(
      log.context,
      log.client,
      log.logger,
      log.level,
      log.levelCode,
      log.message,
      log.thread,
      log.timestamp,
      '未满足table列表的初始化条件'
    );
  }

  initQueryForm() {
    this.queryForm.addControl(this.keys.clientId, new FormControl(null));
    this.queryForm.addControl(this.keys.message, new FormControl(null));
    this.queryForm.addControl(this.keys.level, new FormControl(null));
  }


}
