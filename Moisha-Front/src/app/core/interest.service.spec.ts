import { TestBed, inject } from '@angular/core/testing';

import { InterestService } from './interest.service';

describe('InterestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterestService]
    });
  });

  it('should be created', inject([InterestService], (service: InterestService) => {
    expect(service).toBeTruthy();
  }));
});
