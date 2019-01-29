import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
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
    private page = new Page<Client>();
    searchSchema: SFSchema = {
        properties: {
            no: {
                type: 'string',
                title: '编号',
            },
        },
    };
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
        this.clientService.page()
            .subscribe((page: Page<Client>) => {
                console.log(page);
                this.page = page;
            });
    }

    add() {
        this.modal
            .createStatic(ClientAddComponent, { i: {} })
            .subscribe(() => this.st.reload());
    }

}
