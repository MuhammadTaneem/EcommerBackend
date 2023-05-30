import { TestBed } from '@angular/core/testing';

import { PdetailsResolver } from './pdetails.resolver';

describe('PdetailsResolver', () => {
  let resolver: PdetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PdetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
