import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CvsService } from '@services/http/cvs.service';
import {
  deleteCV, deleteCVFail, deleteCVSuccess,
  getCVById,
  getCVByIdFail,
  getCVByIdSuccess,
  getCVsList,
  getCVsListFail,
  getCVsListSuccess, postCV, updateCV, updateCVFail, updateCVSuccess
} from '@ourStore/cvs/cvs.actions';

@Injectable()
export class CVsEffects {

  constructor(
    private actions$: Actions,
    private store: Store,
    private cvsService: CvsService,
  ) { }

  public svsList$ = createEffect(() => this.actions$.pipe(
    ofType(getCVsList),
    switchMap(() => {
      return this.cvsService.getCVsList();
    }),
    map((cvsList) =>
      getCVsListSuccess({ cvsList })
    ),
    catchError((errorResponse: HttpErrorResponse) =>
      of(getCVsListFail({ errors: errorResponse.error }))
    )
  ));

  public cvById$ = createEffect(() => this.actions$.pipe(
    ofType(getCVById),
    switchMap(({id}) => {
      return this.cvsService.getCVById(id);
    }),
    map((cv) =>
      getCVByIdSuccess({ cv })
    ),
    catchError((errorResponse: HttpErrorResponse) =>
      of(getCVByIdFail({ errors: errorResponse.error }))
    )
  ));

  public updateCV$ = createEffect(() => this.actions$.pipe(
    ofType(updateCV),
    switchMap(({newCV}) => {
      return this.cvsService.updateCV(newCV);
    }),
    map(() =>
      updateCVSuccess()
    ),
    catchError((errorResponse: HttpErrorResponse) =>
      of(updateCVFail({ errors: errorResponse.error }))
    )
  ));

  public postCV$ = createEffect(() => this.actions$.pipe(
    ofType(postCV),
    switchMap(({ newCV }) => {
      return this.cvsService.postCV(newCV);
    }),
    map(() =>
      updateCVSuccess()
    ),
    catchError((errorResponse: HttpErrorResponse) =>
      of(updateCVFail({ errors: errorResponse.error }))
    )
  ));

  public deleteCV$ = createEffect(() => this.actions$.pipe(
    ofType(deleteCV),
    switchMap(({ id }) => {
      return this.cvsService.deleteCV(id);
    }),
    map(() =>
      deleteCVSuccess()
    ),
    catchError((errorResponse: HttpErrorResponse) =>
      of(deleteCVFail({ errors: errorResponse.error }))
    )
  ));

}
