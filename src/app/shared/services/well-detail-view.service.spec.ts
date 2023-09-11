import { TestBed } from '@angular/core/testing';

import { WellDetailViewService } from './well-detail-view.service';

describe('WellDetailViewService', () => {
  let service: WellDetailViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WellDetailViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
