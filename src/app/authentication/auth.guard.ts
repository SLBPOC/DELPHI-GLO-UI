import { Injectable } from '@angular/core';
// import { LoginService } from '@agora/agora-ui-library';     // Commented for Testing

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor() {}      // private loginService: LoginService      // Commented for Testing

  public canActivate(): boolean {
     // Commented for Testing
    // if (this.loginService.isAuthenticated()) {
    //   return true;
    // } else {
    //   this.loginService.login();

      return false;
    // }
  }
}
