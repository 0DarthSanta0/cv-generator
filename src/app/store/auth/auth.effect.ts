import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {registerAction, registerFailureAction, registerSuccessAction} from "./actions/register.actions";
import {catchError, map, of, switchMap} from "rxjs";
import {AuthService} from "../../shared/services/http/auth.service";
import {CurrentUserInterface} from "../../shared/models/current-user.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {LocalStorageService} from "../../shared/services/local-storage.service";
import {loginAction, loginFailureAction, loginSuccessAction} from "./actions/login.actions";

@Injectable()
export class AuthEffect {

  register$ = createEffect(() => this.actions$.pipe(
      ofType(registerAction),
      switchMap(({request}) => {
        return this.authService.register(request).pipe(
            map((currentUser: CurrentUserInterface) => {
              this.localStorage.setValue('accessToken', currentUser.jwt);
              return registerSuccessAction({currentUser});
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(
                  registerFailureAction({errors: errorResponse.error.error})
              );
            })
        )
      })
  ));

  login$ = createEffect(() => this.actions$.pipe(
      ofType(loginAction),
      switchMap(({request}) => {
        return this.authService.login(request).pipe(
            map((currentUser) => {
              this.localStorage.setValue('accessToken', currentUser.jwt);
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