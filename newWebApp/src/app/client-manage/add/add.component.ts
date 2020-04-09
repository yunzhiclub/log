import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Client} from '../../norm/entity/client';
import {ClientService} from '../../service/client.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
  formGroup: FormGroup;

  client: Client;

  constructor(private clientService: ClientService,
              private router: Router) { }

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
      .subscribe(
        (client) => {
          this.router.navigateByUrl('/client');
          console.log(client); },
        (data) => {
          this.router.navigateByUrl('/client');
          console.log(data); });

  }
}
