import {Component, ElementRef, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Client} from '../../../entity/client';
import {ClientService} from '../../../service/client.service';
import {CommonService} from '../../../service/common.service';
import {tokenValidator} from './token-validator';
import {TokenAsyncValidators} from "./token-async-validators";
import {randomString} from '@yunzhi/ng-mock-api';


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
console = console;
  constructor(private clientService: ClientService,
              private commonService: CommonService,
              private tokenAsyncValidators: TokenAsyncValidators,
              private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.inItFormControl();
  }

  /**
   * 初始化formGroup
   */
  inItFormControl() {
    const formControlToken = new FormControl('',
      [ Validators.required, tokenValidator.tokenLength, tokenValidator.token], this.tokenAsyncValidators.tokenNotExist());
    this.formGroup.addControl(this.formKeys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.formKeys.token, formControlToken);
    this.formGroup.addControl(this.formKeys.url, new FormControl('', Validators.required));

    // 生成随机32位token
    const randomToken = randomString('',32);
    this.formGroup.get(this.formKeys.token).setValue(randomToken);
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

  copyText() {
    const input = this.elementRef.nativeElement.querySelector('#token');
    input.value = this.formGroup.get(this.formKeys.token).value;
    input.select();
    document.execCommand('copy');
    this.commonService.success(() => {
    },'','复制成功');
  }
}
