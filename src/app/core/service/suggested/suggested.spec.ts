import { TestBed } from '@angular/core/testing';

import { Suggested } from './suggested';

describe('Suggested', () => {
  let service: Suggested;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Suggested);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
