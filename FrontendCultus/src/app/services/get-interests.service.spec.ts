import { TestBed } from '@angular/core/testing';

import { GetInterestsService } from './get-interests.service';

describe('GetInterestsService', () => {
  let service: GetInterestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetInterestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
