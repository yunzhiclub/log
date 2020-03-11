import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.http.get('/log/page')
      .subscribe((data) => {console.log(data)}, (data) => {console.log(data)});
  }

}
