import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Page} from "@yunzhi/ng-common";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CommonService} from "../../../service/common.service";
import {Assert, getDefaultWhenValueIsInValid} from "@yunzhi/utils";
import {config} from "../../../conf/app.config";
import {DingService} from "../../../service/ding.service";
import {Ding} from "../../../entity/ding";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  keys = {
    page: 'page',
    size: 'size',
    name: 'name',
    client: 'client',
    connectionStatus: 'connectionStatus',
    webhook: 'webhook',
    secret: 'secret'
  };

  pageData = {} as Page<Ding>;
  params: Params;
  queryForm = new FormGroup({});

  constructor(private commonService: CommonService,
              private dingService: DingService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {

    // 使用this.keys初始化queryForm，从而避免拼写错误
    this.queryForm.addControl(this.keys.name, new FormControl());
    this.queryForm.addControl(this.keys.client, new FormControl(null));
    this.queryForm.addControl(this.keys.connectionStatus, new FormControl(null));

    // 订阅参数变化
    this.route.queryParams.subscribe((params: { page?: string, size?: string }) => {
      // 缓存查询参数
      this.params = params;
      // 使用参数中的数据设置formGroup
      this.queryForm.get(this.keys.name).setValue(params[this.keys.name]);
      this.queryForm.get(this.keys.connectionStatus).setValue(params[this.keys.connectionStatus]);
      this.queryForm.get(this.keys.client).setValue(params[this.keys.client]);

      getDefaultWhenValueIsInValid(params[this.keys.page], '0');
      getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString());

      // 发起查询
      this.dingService.page(
        // 调用stringToIntegerNumber将查询的字符串转为number
        getDefaultWhenValueIsInValid(params[this.keys.page], '0'),
        getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString()),
        {
          name: params[this.keys.name],
          clientId: params[this.keys.client],
          connectionStatus: params[this.keys.connectionStatus]
        },
      ).subscribe(page => {
        console.log(page.content);
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
  validateData(data: Page<Ding>): void {
    data.content.forEach(v => this.validateUser(v));
    this.pageData = data;
  }

  /**
   * 校验字段是否符合V层表现
   * @param ding 机器人
   */
  validateUser(ding: Ding): void {
    // 必有条件
    Assert.isNotNullOrUndefined(
      ding.id,
      ding.name,
      ding.connectionStatus,
      ding.client,
      ding.webHook,
      ding.secret,
      '未满足table列表的初始化条件'
    );
  }

  /**
   * 启用或停用机器人
   * @param ding 机器人
   */
  startOrEnd(ding: Ding) {
    Assert.isNotNullOrUndefined(ding.id, 'id未定义');
    this.commonService.confirm((confirm = false) => {
      if (confirm) {
        this.dingService.startOrEnd(ding.id)
          .subscribe(() => {
            this.commonService.success(() => ding.start = !ding.start);
          });
      }
    }, '');
  }

  /**
   * 点击小眼睛获取webHook
   * @param ding
   */
  getWebHook(ding: Ding) {
    this.dingService.getById(ding.id)
      .subscribe(value => {
        this.commonService.show(value.webHook, 'wenHook为')
      })
  }

  /**
   * 点击小眼睛获取secret
   * @param ding
   */
  getSecret(ding: Ding) {
    this.dingService.getById(ding.id)
      .subscribe(value => {
        this.commonService.show(value.secret, 'secret为')
      })
  }
}

