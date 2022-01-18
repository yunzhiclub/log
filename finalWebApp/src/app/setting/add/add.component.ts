import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Ding} from "../../../entity/ding";
import {SettingService} from "../../../service/settingService";
import {CommonService} from "../../../service/common.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  keys = {
    name: 'name',
    clientId: 'clientId',
    webhook: 'webhook',
    secret: 'secret',
  }
  formGroup = new FormGroup({});

  constructor(private settingService: SettingService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup() {
    this.formGroup.addControl(this.keys.name, new FormControl('', Validators.required));
    this.formGroup.addControl(this.keys.clientId, new FormControl('', Validators.required));
    this.formGroup.addControl(this.keys.webhook, new FormControl('', Validators.required));
    this.formGroup.addControl(this.keys.secret, new FormControl('', Validators.required));
  }

  onSubmit(formGroup: FormGroup) {
    const newDing = new Ding({
      name: formGroup.get(this.keys.name).value,
      clientId: formGroup.get(this.keys.clientId).value,
      webHook: formGroup.get(this.keys.webhook).value,
      secret: formGroup.get(this.keys.secret).value,
    })
    this.settingService.save(newDing)
      .subscribe(() => {
        this.commonService.success(() => {
          this.commonService.back();
        })
      })
  }
}
