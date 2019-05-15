import {Component, OnInit} from '@angular/core';
import {Log} from '../../core/entity/Log';
import {Page} from '../../core/entity/Page';
import {LogService} from '../../core/service/log.service';

@Component({
    selector: 'app-backgroud',
    templateUrl: './backgroud.component.html',
    styleUrls: ['./backgroud.component.css']
})
export class BackgroudComponent implements OnInit {
    logPage: Page<Log> = new Page<Log>();
    params = {
        page: 0,
        size: 20
    };

    constructor(private logService: LogService) {
    }

    ngOnInit() {
      this.load();
    }

    load() {
        this.logService.page(this.params).subscribe(
            (logPage: Page<Log>) => {
                this.logPage = logPage;
            }
        );
    }

    paginate($event: {first: number, page: number, pageCount: number, rows: number}) {
        this.params.page = $event.page;
        this.params.size = $event.rows;
        this.load();
    }
}
