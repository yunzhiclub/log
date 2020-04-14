import { Component, OnInit } from '@angular/core';
import {SettingService} from '../../service/setting.service';
import {Ding} from '../../norm/entity/ding';
import {FormControl, FormGroup} from '@angular/forms';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {
  formGroup: FormGroup;
  ding: Ding;
  constructor(private settingService: SettingService, private appComponent: AppComponent,) { }

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
      () => {
        this.appComponent.success(() => {
        }, '数据更新成功');
      }, () => {
        this.appComponent.error(() => {
        }, `数据更新失败`);
      }
    );
    this.load();
  }
}
