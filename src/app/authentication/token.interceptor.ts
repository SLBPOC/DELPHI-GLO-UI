import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from '@agora/agora-ui-library';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private accessToken = '';
  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.accessToken = this.loginService.getAccessToken();

    const isSauthTokenRequest = request.url.includes('/token') || request.url.includes('/getconfigurations');

    if (this.accessToken && !isSauthTokenRequest) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.accessToken}` },
      });
    }

    return next.handle(request).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.loginService.login();
          }
        }

        return throwError(() => err);
      })
    );
  }
}
