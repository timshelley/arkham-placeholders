import { TestBed } from '@angular/core/testing';

import { CardDBService } from './card-db.service';

describe('CardDBService', () => {
  let service: CardDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
