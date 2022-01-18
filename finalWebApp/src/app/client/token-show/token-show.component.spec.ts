import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenShowComponent } from './token-show.component';
import {randomNumber} from "@yunzhi/ng-mock-api";
import {Client} from "../../../entity/client";
import {ApiTestingModule} from "../../../api/api.testing.module";
import {TokenShowModule} from "./token-show.module";
import {getTestScheduler} from "jasmine-marbles";
import {RouterTestingModule} from "@yunzhi/ng-router-testing";

describe('TokenShowComponent', () => {
  let component: TokenShowComponent;
  let fixture: ComponentFixture<TokenShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenShowComponent ],
      imports: [ApiTestingModule,
      TokenShowModule,
      RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.client = {
      id: randomNumber(),
      token: 'token******'
    }  as Client;
    expect(component).toBeTruthy();
  });
  afterEach(() => {
    fixture.autoDetectChanges();
    getTestScheduler().flush();
  });
});
