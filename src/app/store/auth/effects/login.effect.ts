import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../../shared/services/http/auth.service";
import {LocalStorageService} from "../../../shared/services/local-storage.service";
import {loginAction, loginFailureAction, loginSuccessAction} from "../actions/login.action";
import {catchError, map, of, switchMap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class LoginEffect {

  login$ = createEffect(() => this.actions$.pipe(
      ofType(loginAction),
      switchMap(({request}) => {
        return this.authService.login(request).pipe(
            map((currentUser) => {
              this.localStorage.set('accessToken', currentUser.jwt);
              return loginSuccessAction({currentUser});
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(loginFailureAction({errors: errorResponse.error.error}))
            })
        )
      })
  ));

  constructor(private actions$: Actions,
              private authService: AuthService,
              private localStorage: LocalStorageService
  ) {
  }
}