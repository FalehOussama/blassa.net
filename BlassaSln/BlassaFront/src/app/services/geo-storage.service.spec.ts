import { TestBed } from '@angular/core/testing';

import { GeoStorageService } from './geo-storage.service';

describe('GeoStorageService', () => {
  let service: GeoStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
