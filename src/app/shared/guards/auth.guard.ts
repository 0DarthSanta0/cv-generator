import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { isLoggedIn } from '../../store/auth/auth.selectors';
import { AppRoutes } from '../constants/app-routes';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store,
    private route: Router,
  ) {
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.store.select(isLoggedIn).subscribe(
      (isLogged: boolean | null) => {
        if (!isLogged && isLogged != null) {
          this.route.navigate([`/${AppRoutes.REGISTER_ROUTE}`]);
        }
      }
    );
    return true;
  }

}
