import { TestBed } from '@angular/core/testing';

import { CurrentWlService } from './current-wl.service';

describe('CurrentWlService', () => {
  let service: CurrentWlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentWlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
