import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.authService.autoAuthUser();
    this.authService.redirectUrl = state.url;
    console.log('router accessss',state.url);
    localStorage.setItem('redirectUrl',state.url);
    console.log(this.authService.redirectUrl);

    const isAuth = this.authService.authenticationStatus();
    console.log(isAuth);
    if (!isAuth) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
}
