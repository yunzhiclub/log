import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
    selector: 'app-client-add',
    templateUrl: './add.component.html',
})
export class ClientAddComponent implements OnInit {
    record: any = {};
    i: any;
    schema: SFSchema = {
        properties: {
            name: { type: 'string', title: '名称', maxLength: 15 },
            address: { type: 'string', title: '访问地址', format: 'uri' },
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
        private msgSrv: NzMessageService,
        public http: _HttpClient,
    ) {
    }

    ngOnInit(): void {
        if (this.record.id > 0)
            this.http.get(`/user/${this.record.id}`).subscribe(res => (this.i = res));
    }

    save(value: any) {
        this.http.post(`/user/${this.record.id}`, value).subscribe(res => {
            this.msgSrv.success('保存成功');
            this.modal.close(true);
        });
    }

    close() {
        this.modal.destroy();
    }
}
