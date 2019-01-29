import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { Client } from '@core/entity/Client';
import { ClientService } from '@core/service/ClientService';

@Component({
    selector: 'app-client-add',
    templateUrl: './add.component.html',
})
export class ClientAddComponent implements OnInit {
    record: Client = new Client();
    schema: SFSchema = {
        properties: {
            name: { type: 'string', title: '名称', maxLength: 15 },
            address: { type: 'string', title: '访问地址', default: this.record.address, format: 'uri' },
            description: { type: 'string', title: '描述', maxLength: 140 },
        },
        required: ['name', 'address', 'description'],
    };
    ui: SFUISchema = {
        '*': {
            spanLabelFixed: 100,
            grid: { span: 12 },
        },
        $no: {
            widget: 'text',
        },
        $address: {
            widget: 'string',
        },
        $description: {
            widget: 'textarea',
            grid: { span: 24 },
        },
    };

    constructor(
        private modal: NzModalRef,
        private messageService: NzMessageService,
        public http: _HttpClient,
        private clientService: ClientService,
    ) {
    }

    ngOnInit(): void {}

    save(client: Client) {
        this.clientService.save(client)
            .subscribe(() => {
                this.messageService.success('保存成功');
                this.modal.close(true);
            });
    }

    close() {
        this.modal.destroy();
    }
}
