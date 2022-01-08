import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Ding} from '../../entity/ding';
import {SettingService} from '../../service/settingService';
import {CommonService} from '../../service/common.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  formGroup: FormGroup;
  ding: Ding;
  constructor(private settingService: SettingService, private commonService: CommonService ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.formGroup = new FormGroup({
      webHook: new FormControl(''),
      secret: new FormControl('')
    });
    this.settingService.getDing().subscribe(
      (data) => {
        this.ding = data;
        this.formGroup.setValue({
          webHook: data.webHook,
          secret: data.secret
        });
      }
    );
  }

  onSubmit(): void {
    this.ding.webHook = this.formGroup.get('webHook').value;
    this.ding.secret = this.formGroup.get('secret').value;
    this.settingService.setDing(this.ding).subscribe(
      (ding) => {
        this.formGroup.setValue({
          webHook: ding.webHook,
          secret: ding.secret
        });
        this.commonService.success(() => {
        }, '数据更新成功');
      }, () => {
        this.commonService.error(() => {
        }, `数据更新失败`);
      }
    );
    this.load();
  }

}
