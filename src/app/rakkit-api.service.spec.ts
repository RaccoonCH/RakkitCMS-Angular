import { TestBed } from '@angular/core/testing';

import { RakkitApiService } from './rakkit-api.service';

describe('RakkitApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RakkitApiService = TestBed.get(RakkitApiService);
    expect(service).toBeTruthy();
  });
});
