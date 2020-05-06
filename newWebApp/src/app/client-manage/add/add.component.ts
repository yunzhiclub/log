import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Client} from '../../norm/entity/client';
import {ClientService} from '../../service/client.service';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
  formGroup: FormGroup;

  client: Client;

  constructor(private clientService: ClientService,
              private router: Router,
              private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.client = new Client();
    this.formGroup = new FormGroup({
      name: new FormControl(''),
      token: new FormControl(''),
      url: new FormControl('')
    });
  }

  onSubmit(): void {
    this.client = this.formGroup.value;
    this.clientService.save(this.client)
      .subscribe(() => {
        this.appComponent.success(() => {
          this.router.navigateByUrl('/client');
        }, '日志新增成功');
      }, (res: HttpErrorResponse) => {
        this.appComponent.error(() => {
        }, `日志新增失败:${res.error.message}`);
      });
  }
}
