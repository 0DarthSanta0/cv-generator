import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
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
    return this.store.select(isLoggedIn).pipe(
      filter((isLogged: boolean | null) => {
        if (isLogged !== null) return true;
        return false;
      }),
      map((isLogged: boolean | null) => {
          if (!isLogged) {
            this.route.navigate([`/${AppRoutes.REGISTER_ROUTE}`]);
            return false;
          };
          return true;
        }
      ),
    );
  }

}
