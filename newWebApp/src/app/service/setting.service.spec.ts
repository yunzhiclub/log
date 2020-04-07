import { TestBed } from '@angular/core/testing';

import { SettingService } from './setting.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SettingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: SettingService = TestBed.get(SettingService);
    expect(service).toBeTruthy();
  });
});
