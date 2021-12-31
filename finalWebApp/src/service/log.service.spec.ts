import { TestBed } from '@angular/core/testing';

import { LogService } from './log.service';
import {ApiTestingModule} from '../api/api.testing.module';
import {RouterTestingModule} from '@yunzhi/ng-router-testing';

describe('LogService', () => {
  let service: LogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiTestingModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(LogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
