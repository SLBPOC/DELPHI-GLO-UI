import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// import { LoginService } from '@agora/agora-ui-library';    // Commented for Testing
// import { LoginServiceStub } from '../mocks/login.service.mock';       // Commented for Testing
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
       // Commented for Testing
      // providers: [AuthGuard, { provide: LoginService, useClass: LoginServiceStub }],
      imports: [HttpClientTestingModule],
    });
    authGuard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('be able to hit route when user is logged in', () => {
     // Commented for Testing
    // spyOn(authGuard['loginService'], 'isAuthenticated').and.callFake(function () {
    //   return true;
    // });
    expect(authGuard.canActivate()).toBe(true);
  });

  it('not be able to hit route when user is not logged in', () => {
     // Commented for Testing
    // spyOn(authGuard['loginService'], 'isAuthenticated').and.callFake(function () {
    //   return false;
    // });
    expect(authGuard.canActivate()).toBe(false);
  });
});
