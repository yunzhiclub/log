import {Component, OnInit} from '@angular/core';
import {Page} from '@yunzhi/ng-common';
import {Client} from '../../../entity/client';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {Assert} from '@yunzhi/ng-mock-api';
import {FormControl, FormGroup} from '@angular/forms';
import {getDefaultWhenValueIsInValid} from '@yunzhi/utils';
import {config} from '../../../conf/app.config';
import {ClientService} from '../../../service/client.service';

/**
 * 客户端管理首页
 * author: liMngAo
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  keys = {
    name: 'name',
    page: 'page',
    size: 'size'
  };
  params: Params;
  pageData = {} as Page<Client>;
  formGroup = new FormGroup({});

  constructor(private route: ActivatedRoute,
              private commonService: CommonService,
              private clientService: ClientService,
              private router: Router) {
  }

  /**
   * 数据校验
   * @param page 分页
   */
  private validate(page: Page<Client>) {

    Assert.isNotNullOrUndefined(page.size, page.totalElements, page.number, '未满足初始化条件');
    page.content.forEach(client => {
      Assert.isNotNullOrUndefined(
        client.id,
        client.name,
        client.token,
        client.url,
        '校验中继器错误'
      );

    });
  }

  ngOnInit(): void {
    this.subscribeQueryParams();
  }

  initFormGroup() {
    this.formGroup!.addControl(this.keys.name, new FormControl(''));
  }

  subscribeQueryParams() {
    this.initFormGroup();
    this.route.queryParams.subscribe((params: { page?: string, size?: string, name?: string }) => {
      this.params = params;
      this.formGroup.get(this.keys.name).setValue(params.name);
      getDefaultWhenValueIsInValid(params[this.keys.page], '0');
      getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString());
      this.clientService.page(
        getDefaultWhenValueIsInValid(params[this.keys.page], '0'),
        getDefaultWhenValueIsInValid(params[this.keys.size], config.size.toString()),
        {
          name: params[this.keys.name],
        },
      ).subscribe(page => {
        this.validate(page);
        this.pageData = page;
      });
    });
  }

  /**
   * 点击分页
   * @param page 当前页
   */
  onPageChange(page: number): void {
    this.reload({...this.params, ...{page: page.toString()}});
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
   * 点击改变每页大小
   * @param size 每页大小
   */
  onSizeChange(size: number): void {
    this.reload({...this.params, ...{size: size.toString()}});
  }

  onSubmit(queryForm: FormGroup): void {
    this.reload({...this.params, ...queryForm.value});
  }
  /**
   * 删除
   */
  onDelete(object: Client): void {
    Assert.isNotNullOrUndefined(object.id, 'id未定义');
    this.commonService.confirm((confirm = false) => {
      if (confirm) {
        const index = this.pageData.content.indexOf(object);
        this.clientService.delete(object.id!)
          .subscribe(() => {
            this.commonService.success(() => this.pageData.content.splice(index, 1));
          });
      }
    }, '');
  }
  location(url: string): void{
    window.open(url);
  }
}

