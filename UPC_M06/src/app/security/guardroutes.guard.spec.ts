import { TestBed } from '@angular/core/testing';

import { GuardroutesGuard } from './guardroutes.guard';

describe('GuardroutesGuard', () => {
  let guard: GuardroutesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardroutesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
