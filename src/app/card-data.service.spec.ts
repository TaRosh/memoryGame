import { TestBed, inject } from '@angular/core/testing';

import { CardDataService } from './card-data.service';

describe('CardDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardDataService]
    });
  });

  it('should be created', inject([CardDataService], (service: CardDataService) => {
    expect(service).toBeTruthy();
  }));
});
