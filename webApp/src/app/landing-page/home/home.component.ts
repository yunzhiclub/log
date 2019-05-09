import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: '../../../assets/pages/landing.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private router: Router) {
    }

    toMainComponent() {
        this.router.navigateByUrl('/main');
    }

    ngOnInit() {
    }
}
