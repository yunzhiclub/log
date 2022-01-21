import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Assert} from "@yunzhi/utils";
import {ActivatedRoute} from "@angular/router";
import {DingService} from "../../../service/ding.service";
import {Ding} from "../../../entity/ding";
import {CommonService} from "../../../service/common.service";
import {SettingValidators} from "../setting-validators";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  formGroup = new FormGroup({});
  /**
   * form表单关键字
   */
  keys = {
    id: 'id',
    name: 'name',
    clientId: 'clientId',
    webhook: 'webhook',
    secret: 'secret',
  };

  ding = {} as Ding;

  constructor(private route: ActivatedRoute,
              private dingService: DingService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.initFromGroup();
    this.route.params.subscribe(param => {
      const id = +param.id;
      Assert.isNumber(id, 'id must be number');
      this.loadById(+id);
    });
  }

  initFromGroup() {
    this.formGroup.addControl(this.keys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.keys.clientId, new FormControl('', Validators.required));
    this.formGroup.addControl(this.keys.webhook, new FormControl('', [Validators.required, SettingValidators.isRightWebhook]));
    this.formGroup.addControl(this.keys.secret, new FormControl('', Validators.required));
  }


  loadById(id: number): void {
    this.dingService.getById(id)
      .subscribe((ding: Ding) => {
        this.setDing(ding);
      }, (error: any) => console.log(error));
  }

  /**
   * 用获取到的数据初始化ding
   * @param ding
   */
  setDing(ding: Ding) {
    this.ding = ding;
    this.formGroup.get(this.keys.name).setValue(ding.name);
    this.formGroup.get(this.keys.secret).setValue(ding.secret);
    this.formGroup.get(this.keys.webhook).setValue(ding.webHook);
    this.formGroup.get(this.keys.clientId).setValue(ding.client.id);
  }

  /**
   * 点击提交
   * @param formGroup
   */
  onSubmit(formGroup: FormGroup): void {
    const ding = {
      id: this.ding.id,
      name: formGroup.get(this.keys.name).value as string,
      secret: formGroup.get(this.keys.secret).value as String,
      webHook: formGroup.get(this.keys.webhook).value as String
    } as Ding;
    this.dingService.update(this.ding.id, ding)
      .subscribe(() => {
        this.commonService.success(() => this.commonService.back());
      }, (error) => {
        this.commonService.error(() => {
        }, error)
      });
  }
}
