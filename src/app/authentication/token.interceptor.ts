import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
// import { LoginService } from '@agora/agora-ui-library';     // Commented for Testing

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private accessToken = '';
  constructor() {} // private loginService: LoginService   // Commented for Testing

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // this.accessToken = this.loginService.getAccessToken();

    const isSauthTokenRequest = request.url.includes('/token') || request.url.includes('/getconfigurations');

    // if (this.accessToken && !isSauthTokenRequest)  // Commented for Testing
    if (!isSauthTokenRequest) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.accessToken}` },
      });
    }

    return next.handle(request).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // this.loginService.login();    // Commented for Testing
          }
        }

        return throwError(() => err);
      })
    );
  }
}
