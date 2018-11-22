import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate, CanActivateChild {

  public isLoggedIn: boolean; // tell login status
  public role: string; // logged in user role

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
    this.accountService.isAuthenticated
      .subscribe((isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn; // get logged in status
      });

    this.accountService.userRole
      .subscribe((role) => {
        this.role = role; // get the role of current logged in user
      });
  }





  // for parrent component routes**************************************************
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }
  checkLogin(): boolean {
    if (this.isLoggedIn === true) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  // for child component routes
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
  // *********************************************************************************


}
