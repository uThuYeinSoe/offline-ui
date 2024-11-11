import { TestBed } from '@angular/core/testing';

import { AgencyTransitionService } from './agency-transition.service';

describe('AgencyTransitionService', () => {
  let service: AgencyTransitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgencyTransitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
