import {TestBed} from '@angular/core/testing';

import {DingService} from './ding.service';
import {ApiTestingModule} from "../api/api.testing.module";
import {RouterTestingModule} from "@yunzhi/ng-router-testing";

describe('DingRobotService', () => {
  let service: DingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(DingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
