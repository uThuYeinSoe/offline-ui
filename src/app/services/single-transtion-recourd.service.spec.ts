import { TestBed } from '@angular/core/testing';

import { SingleTranstionRecourdService } from './single-transtion-recourd.service';

describe('SingleTranstionRecourdService', () => {
  let service: SingleTranstionRecourdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleTranstionRecourdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
