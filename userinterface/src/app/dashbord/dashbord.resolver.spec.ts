import { TestBed } from '@angular/core/testing';

import { DashbordResolver } from './dashbord.resolver';

describe('DashbordResolver', () => {
  let resolver: DashbordResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DashbordResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
