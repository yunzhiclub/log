import {Component, Input, OnInit} from '@angular/core';
import {Client} from "../../../entity/client";
import {ClientService} from "../../../service/client.service";
import {CommonService} from "../../../service/common.service";

@Component({
  selector: 'app-token-show',
  templateUrl: './token-show.component.html',
  styleUrls: ['./token-show.component.css']
})
export class TokenShowComponent {

  @Input()
  client: Client;
  constructor(private clientService: ClientService,
              private commonService: CommonService) { }

  getToken(client: Client): void {
    if(client && client.id) {
      this.clientService.getById(client.id)
        .subscribe(value => {
          this.commonService.show(value.token)
        })
    }
  }

}
