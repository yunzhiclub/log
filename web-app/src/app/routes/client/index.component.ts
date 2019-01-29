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
    private page: Page<Client>;
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
        { title: '编号', index: 'no' },
        { title: '调用次数', type: 'number', index: 'callNo' },
        { title: '头像', type: 'img', width: '50px', index: 'avatar' },
        { title: '时间', type: 'date', index: 'updatedAt' },
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
