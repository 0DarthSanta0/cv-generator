import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CvsService } from '@services/http/cvs.service';
import {
  deleteCV,
  deleteCVFail,
  deleteCVSuccess,
  getCVById,
  getCVByIdFail,
  getCVByIdSuccess,
  getCVsList,
  getCVsListFail,
  getCVsListSuccess,
  postCV,
  updateCV,
  updateCVFail,
  updateCVSuccess
} from '@ourStore/cvs/cvs.actions';
import {
  CV_DELETE_FAILURE,
  CV_DELETE_SUCCESS,
  CV_POST_FAILURE,
  CV_POST_SUCCESS,
  CV_UPDATE_FAILURE,
  CV_UPDATE_SUCCESS
} from '@constants/toast-messages';
import { MessageService } from 'primeng/api';

@Injectable()
export class CVsEffects {

  public svsList$ = createEffect(() => this.actions$.pipe(
    ofType(getCVsList),
    switchMap(() => this.cvsService.getCVsList()),
    map((cvsList) => getCVsListSuccess({cvsList})),
    catchError((errorResponse: HttpErrorResponse) => of(getCVsListFail({errors: errorResponse.error})))
  ));

  public cvById$ = createEffect(() => this.actions$.pipe(
    ofType(getCVById),
    switchMap(({id}) => this.cvsService.getCVById(id)),
    map((cv) => getCVByIdSuccess({cv})),
    catchError((errorResponse: HttpErrorResponse) =>
      of(getCVByIdFail({errors: errorResponse.error}))
    )
  ));

  public updateCV$ = createEffect(() => this.actions$.pipe(
    ofType(updateCV),
    switchMap(({newCV}) => this.cvsService.updateCV(newCV)),
    map(() => {
        this.messageService.add({severity: 'success', summary: CV_UPDATE_SUCCESS});
        return updateCVSuccess();
      }
    ),
    catchError((errorResponse: HttpErrorResponse) => {
        this.messageService.add({severity: 'error', summary: CV_UPDATE_FAILURE});
        return of(updateCVFail({errors: errorResponse.error}));
      }
    )
  ));

  public postCV$ = createEffect(() => this.actions$.pipe(
    ofType(postCV),
    switchMap(({newCV}) => this.cvsService.postCV(newCV)),
    map(() => {
        this.messageService.add({severity: 'success', summary: CV_POST_SUCCESS});
        return updateCVSuccess();
      }
    ),
    catchError((errorResponse: HttpErrorResponse) => {
        this.messageService.add({severity: 'error', summary: CV_POST_FAILURE});
        return of(updateCVFail({errors: errorResponse.error}));
      }
    )
  ));

  public deleteCV$ = createEffect(() => this.actions$.pipe(
    ofType(deleteCV),
    switchMap(({id}) => this.cvsService.deleteCV(id)),
    map(() => {
        this.messageService.add({severity: 'success', summary: CV_DELETE_SUCCESS});
        return deleteCVSuccess();
      }
    ),
    catchError((errorResponse: HttpErrorResponse) => {
        this.messageService.add({severity: 'error', summary: CV_DELETE_FAILURE});
        return of(deleteCVFail({errors: errorResponse.error}));
      }
    )
  ));

  constructor(
    private actions$: Actions,
    private store: Store,
    private cvsService: CvsService,
    private messageService: MessageService
  ) {
  }
}
