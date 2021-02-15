import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';
import { AuthHelperService } from '../services/auth-helper.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate, CanActivateChild {
  constructor(
    private authHelperService: AuthHelperService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}
  private returnUrl: string;

  isLoggedIn: boolean = false;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.returnUrl = state.url;

    const allowedRoles = next.data.allowedRoles;
    const isAuthorized = this.authorizationService.isAuthorized(allowedRoles);
    this.authHelperService.isUserLogged$.subscribe((res) => {
      this.isLoggedIn = res;
    });
    if (!isAuthorized) {
      this.router.navigate(['auth'], { queryParams: { t: 'login' } });
    } else if (!this.isLoggedIn) {
      this.router.navigateByUrl(
        this.router.createUrlTree(['auth'], {
          queryParams: { t: 'login', returnUrl: this.returnUrl },
        })
      );
      // this.router.navigate(['auth'],{queryParams:{t:'login'}});
    }
    // return isAuthorized;
    return true;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.returnUrl = state.url;
    const allowedRoles = next.data.allowedRoles;
    const isAuthorized = this.authorizationService.isAuthorized(allowedRoles);
    this.authHelperService.isUserLogged$.subscribe((res) => {
      this.isLoggedIn = res;
    });
    if (!isAuthorized) {
      // if not authorized, show access denied message
      this.router.navigate(['auth'], { queryParams: { t: 'login' } });
    } else if (!this.isLoggedIn) {
      this.router.navigateByUrl(
        this.router.createUrlTree(['auth'], {
          queryParams: { t: 'login', returnUrl: this.returnUrl },
        })
      );
      // this.router.navigate(['auth'],{queryParams:{t:'login'}});
    }

    // return isAuthorized;
    return true;
  }
}
