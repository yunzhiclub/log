import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../service/common.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Assert} from '@yunzhi/utils';
import {ClientService} from '../../../service/client.service';
import {Client} from '../../../entity/client';
import {tokenValidator} from '../add/token-validator';
import {TokenAsyncValidators} from "../add/token-async-validators";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private clientService: ClientService,
              private commonService: CommonService,
              private tokenAsyncValidators: TokenAsyncValidators) {
  }

  formGroup = new FormGroup({});
  /**
   * form表单关键字
   */
  formKeys = {
    id: 'id',
    name: 'name',
    token: 'token',
    url: 'url'
  };
  client = {} as Client;
  token: string;
  ngOnInit(): void {
    const formControlToken = new FormControl('',
      [tokenValidator.token, Validators.required], this.tokenAsyncValidators.tokenNotExist());
    this.formGroup.addControl(this.formKeys.id, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.token, formControlToken);
    this.formGroup.addControl(this.formKeys.url, new FormControl('', Validators.required));
    // 获取id并找出对应client
    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isNumber(id, 'id must be number');
      this.loadById(+id);
    });
  }

  /**
   * 由后台加载预编辑的client
   * @param id
   */
  loadById(id: number): void {
    this.formGroup.get('id')?.setValue(id);
    this.clientService.getById(id)
      .subscribe((client) => {
        Assert.isNotNullOrUndefined(client, client.name, client.token, client.url, 'some properties must be passed');
        this.formGroup.get('name').setValue(client.name);
        this.formGroup.get('token').setValue(client.token);
        this.formGroup.get('url').setValue(client.url);
        this.client = client;
      }, error => console.log(error))
  }

  onSubmit(formGroup: FormGroup): void {
    const id = this.formGroup.get('id').value;
    const newClient = new Client({
      id: formGroup.get('id').value,
      name: formGroup.get('name').value,
      token: formGroup.get('token').value,
      url: formGroup.get('url').value
    });

    this.clientService.update(id, newClient)
      .subscribe(() => {
          this.commonService.success(() => this.commonService.back());
        },
        error => console.log('保存失败', error));
  }
}
