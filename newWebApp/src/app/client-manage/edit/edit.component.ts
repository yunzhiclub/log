import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Client} from '../../norm/entity/client';
import {ClientService} from '../../service/client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppComponent} from '../../app.component';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  formGroup: FormGroup;
  client: Client = new Client();

  constructor(private clientService: ClientService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private appComponent: AppComponent) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((param: { id: number }) => {
      this.client.id = param.id;
      this.loadStudentById(this.client.id);
    });
    this.formGroup = new FormGroup({
      name: new FormControl(''),
      token: new FormControl(''),
      url: new FormControl('')
    });

  }

  onSubmit() {
    this.client.name = this.formGroup.get('name').value;
    this.client.token = this.formGroup.get('token').value;
    this.client.url = this.formGroup.get('url').value;
    this.update(this.client);
  }

  update(client: Client) {
    this.clientService.update(client.id, client)
      .subscribe((result) => {
        this.appComponent.success(() => {
        this.router.navigateByUrl('/client');
        this.client = result;
        // this.linkToIndex.nativeElement.click();
        }, '日志信息更新成功');
      }, (res: HttpErrorResponse) => {
        this.appComponent.error(() => {
        }, `日志信息更新失败:${res.error.message}`);
      });
  }

  /**
   * 加载用户
   * @param id 用户ID
   */
  loadStudentById(id: number) {
    this.clientService.getById(id)
      .subscribe(client => {
        this.client = client;
        this.setFormGroupValue(this.client);
      });
  }

  /**
   * 设置表单值
   * @param client 用户
   */
  setFormGroupValue(client: Client) {
    this.formGroup.setValue({
      name: client.name,
      token: client.token,
      url: client.url,
    });
  }
}
