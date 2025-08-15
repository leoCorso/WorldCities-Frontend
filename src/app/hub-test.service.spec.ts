import { TestBed } from '@angular/core/testing';

import { HubTestService } from './hub-test.service';

describe('HubTestService', () => {
  let service: HubTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HubTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
