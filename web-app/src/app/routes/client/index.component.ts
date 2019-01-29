import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STChange, STColumn, STComponent, STData, STPage } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { ClientAddComponent } from './add/add.component';
import { ClientService } from '@core/service/ClientService';
import { Client } from '@core/entity/Client';
import { Page } from '@core/entity/Page';

@Component({
    selector: 'app-client-index',
    templateUrl: './index.component.html',
})
export class ClientIndexComponent implements OnInit {
    private $page = new Page<Client>();             // 分页数据
    private pageConfig: STPage = { front: false };  // 前面用的分页配置 https://ng-alain.com/components/table/zh#%E9%9D%99%E6%80%81%E6%95%B0%E6%8D%AE
    private params = { page: 0, size: 20 };         // 查询参数

    // 查询字段（尚未使用）
    searchSchema: SFSchema = {
        properties: {
            no: {
                type: 'string',
                title: '编号',
            },
        },
    };

    // 定义V层组件
    @ViewChild('st') st: STComponent;
    columns: STColumn[] = [
        { title: 'id', index: 'id' },
        { title: '名称', index: 'name' },
        { title: '访问地址', index: 'address' },
        { title: 'token', index: 'token' },
        { title: '上线时间', index: 'deployDate' },
        { title: '上次交互时间', index: 'lastSendTime' },
        { title: '最近启动时间', index: 'lastStartTime' },
        { title: 'info数', index: 'infoCount' },
        { title: '警告数', index: 'warnCount' },
        { title: '错误数', index: 'warnCount' },
        {
            title: '操作',
            buttons: [
                // { text: '查看', click: (item: any) => `/form/${item.id}` },
                // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
            ],
        },
    ];

    constructor(private http: _HttpClient, private modal: ModalHelper, private clientService: ClientService) {
    }

    ngOnInit() {
        this.load();
    }

    // 新增数据
    add() {
        // 显示modal框
        this.modal
            .createStatic(ClientAddComponent, { i: {} })
            .subscribe(() => {
                this.load();
            });
    }

    // 加载数据
    load() {
        this.clientService.page(this.params)
            .subscribe((page: Page<Client>) => {
                this.$page = page;
            });
    }

    // 重新加载数据
    reload($change: STChange) {
        if ($change.type == 'pi') {
            // 类型为分页，则重置查询参数的分页信息
            this.params.page = $change.pi - 1;
            this.params.size = $change.ps;
        }
        this.load();
    }

}
