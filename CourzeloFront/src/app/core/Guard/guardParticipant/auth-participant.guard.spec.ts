import { TestBed } from '@angular/core/testing';

import { AuthParticipantGuard } from './auth-participant.guard';

describe('AuthParticipantGuard', () => {
  let guard: AuthParticipantGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthParticipantGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
