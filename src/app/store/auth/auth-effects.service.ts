import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { registerAction, registerFailureAction, registerSuccessAction } from './actions/register.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '@services/http/auth.service';
import { UserInterface } from '@models/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '@services/local-storage.service';
import { loginAction, loginFailureAction, loginSuccessAction } from './actions/login.actions';
import {
    getCurrentUserAction,
    getCurrentUserFailureAction,
    getCurrentUserSuccessAction
} from './actions/current-user.action'
import { Router } from '@angular/router';
import { AppRoutes } from '@constants/app-routes';
import { LocalStorageKeysEnum } from '@constants/local-storage-keys';

@Injectable()
export class AuthEffects {

    public register$ = createEffect(() => this.actions$.pipe(
        ofType(registerAction),
        switchMap(({request}) => {
            return this.authService.register(request).pipe(
                map((currentUser: UserInterface) => registerSuccessAction({currentUser})),
                tap((currentUser) => this.localStorage.setValue(LocalStorageKeysEnum.ACCESS_TOKEN, currentUser.currentUser.jwt)),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(
                        registerFailureAction({errors: errorResponse.error.error})
                    );
                })
            )
        })
    ));

    public login$ = createEffect(() => this.actions$.pipe(
        ofType(loginAction),
        switchMap(({request}) => {
            return this.authService.login(request).pipe(
                map((currentUser) => loginSuccessAction({currentUser})),
                tap((currentUser) => this.localStorage.setValue(LocalStorageKeysEnum.ACCESS_TOKEN, currentUser.currentUser.jwt)),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(loginFailureAction({errors: errorResponse.error.error}))
                })
            )
        })
    ));

    public getCurrentUser$ = createEffect(() => this.actions$.pipe(
        ofType(getCurrentUserAction),
        switchMap(() => {
            const token = this.localStorage.getValue('accessToken');
            if (!token) {
                return of(getCurrentUserFailureAction());
            }
            return this.authService.getCurrentUser().pipe(
                map((currentUser) => getCurrentUserSuccessAction({currentUser})),
                catchError(() => {
                    return of(getCurrentUserFailureAction());
                })
            )
        })
    ));

    public loginAfterSubmit$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loginSuccessAction),
                tap(() => {
                    this.router.navigateByUrl(AppRoutes.EMPLOYEES_ID_ROUTE)
                })
            ),
        {dispatch: false}
    )

    constructor(private actions$: Actions,
                private authService: AuthService,
                private localStorage: LocalStorageService,
                private router: Router
    ) {
    }
}