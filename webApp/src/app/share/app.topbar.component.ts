import { Component, OnInit } from '@angular/core';
import { AppBootstrapComponent } from './app.bootstrap.component';
import { AppTobarService } from './app.tobar.service';

@Component({
    selector: 'app-topbar',
    templateUrl: `./app.topbar.component.html`,
})
export class AppTopBarComponent implements OnInit {

    constructor(public app: AppBootstrapComponent,
                private appTobarService: AppTobarService) {
    }

    // tobars: Tobar[];

    ngOnInit(): void {
        // this.appTobarService.$tobars.subscribe((tobars: Tobar[]) => {
        //     this.tobars = tobars;
        // });
    }
}
