import { TestBed } from '@angular/core/testing';

import { AnnonceStorageService } from './annonce-storage.service';

describe('AnnonceStorageService', () => {
  let service: AnnonceStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnonceStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
