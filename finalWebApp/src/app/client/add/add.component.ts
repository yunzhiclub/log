import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Client} from '../../../entity/client';
import {ClientService} from '../../../service/client.service';
import {CommonService} from '../../../service/common.service';
import {tokenValidator} from './token-validator';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  /**
   * form表单关键字
   */
  formKeys = {
    name: 'name',
    token: 'token',
    url: 'url'
  };

  formGroup = new FormGroup({});

  constructor(private clientService: ClientService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.inItFormControl();
  }

  /**
   * 初始化formGroup
   */
  inItFormControl() {
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.token, new FormControl('', tokenValidator.token));
    this.formGroup.addControl(this.formKeys.url, new FormControl('', Validators.required));
  }

  /**
   * 点击保存
   * @param formGroup
   */
  onSubmit(formGroup: FormGroup): void {
    const newClient = new Client({
      name: formGroup.get('name').value,
      token: formGroup.get('token').value,
      url: formGroup.get('url').value
    });
    // 调用save方法
    this.clientService.save(newClient)
      .subscribe(() => {
        this.commonService.success(() => {
          this.commonService.back();
        });
      })
  }
}
