import { Injectable } from '@angular/core';
import { LoginService } from '@agora/agora-ui-library';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private loginService: LoginService) {}

  public canActivate(): boolean {
    if (this.loginService.isAuthenticated()) {
      return true;
    } else {
      this.loginService.login();

      return false;
    }
  }
}
