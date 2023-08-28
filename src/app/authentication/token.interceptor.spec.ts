import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { throwError } from 'rxjs/internal/observable/throwError';

import { TokenInterceptor } from './token.interceptor';
import { LoginService } from '@agora/agora-ui-library';
import { LoginServiceStub } from '../mocks/login.service.mock';

describe('TokenInterceptor', () => {
  let interceptor: TokenInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenInterceptor, { provide: LoginService, useClass: LoginServiceStub }],
      imports: [HttpClientTestingModule],
    });
    interceptor = TestBed.inject(TokenInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('when user is  unauthorized', () => {
    const requestMock = new HttpRequest('GET', '/test');
    let response = new HttpErrorResponse({ status: 401 });
    const next: any = {
      handle: jasmine.createSpy('handle').and.callFake(() => throwError(() => response)),
    };

    spyOn(requestMock, 'clone');
    spyOn(interceptor['loginService'], 'getAccessToken').and.callFake(function () {
      return 'TestAccessToken';
    });
    spyOn(interceptor['loginService'], 'login');

    interceptor.intercept(requestMock as any, next).subscribe({
      error: err => {
        expect(interceptor['loginService'].login).toHaveBeenCalled();
        expect(err instanceof HttpErrorResponse).toBeTrue();
        expect((err as HttpErrorResponse).status).toBe(401);
      },
    });
  });
});
