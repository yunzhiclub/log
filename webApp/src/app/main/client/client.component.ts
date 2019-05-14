import {Component, OnInit} from '@angular/core';
import {Client} from '../../core/entity/Client';
import {ClientService} from '../../core/service/ClientService';
import {Page} from '../../core/entity/Page';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
    clients: Client[];      // 客户端
    clientsPage: Page<Client> = new Page(); // 分页信息

    constructor(private clientService: ClientService) {
    }

    ngOnInit() {
        this.clientService.page([]).subscribe(
            (clients: Page<Client>) => {
                this.clientsPage = clients;
            }
        );
    }

}
