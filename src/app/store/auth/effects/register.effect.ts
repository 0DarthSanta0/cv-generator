import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {registerAction, registerFailureAction, registerSuccessAction} from "../actions/register.action";
import {catchError, map, of, switchMap} from "rxjs";
import {AuthService} from "../../../shared/services/http/auth.service";
import {CurrentUserInterface} from "../../../shared/models/current-user.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {LocalStorageService} from "../../../shared/services/local-storage.service";
import {Router} from "@angular/router";

@Injectable()
export class RegisterEffect {

  register$ = createEffect(() => this.actions$.pipe(
      ofType(registerAction),
      switchMap(({request}) => {
        return this.authService.register(request).pipe(
            map((currentUser: CurrentUserInterface) => {
              this.localStorage.set('accessToken', currentUser.jwt);
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

  // redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
  //         ofType(registerSuccessAction),
  //         tap(() => {
  //           this.router.navigateByUrl('/');
  //         })
  //     ),
  //     {dispatch: false}
  // );

  constructor(private actions$: Actions,
              private authService: AuthService,
              private localStorage: LocalStorageService,
              private router: Router
  ) {
  }
}