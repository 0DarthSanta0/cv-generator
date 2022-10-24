import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import * as actions from '@ourStore/main/main-actions';
import { Store } from '@ngrx/store';
import { EmployeesService } from '@services/http/employees.service';
import { SkillsService } from '@services/http/skills.service';
import { EmplLanguageService } from '@services/http/empl-language.service';
import { ResponsibilityService } from '@services/http/responsibility.service';

@Injectable()
export class MainEffects {

  public skillsList$ = createEffect(() => this.actions$.pipe(
    ofType(actions.skillsList),
    switchMap(() =>
      this.skillsService.getListSkills()),
    map((listSkills) =>
      actions.skillsListSuccess({listSkills})
    ),
    catchError((errorResponse: HttpErrorResponse) =>
      of(actions.skillsListFailure({errors: errorResponse.error}))
    )
  ));

  public languagesList$ = createEffect(() => this.actions$.pipe(
    ofType(actions.languagesList),
    switchMap(() =>
      this.languageService.getListLanguage()),
    map((listLanguages) =>
      actions.languagesListSuccess({listLanguages})
    ),
    catchError((errorResponse: HttpErrorResponse) =>
      of(actions.languagesListFailure({errors: errorResponse.error}))
    )
  ));

  public responsibilitiesList = createEffect(() => this.actions$.pipe(
    ofType(actions.responsibilitiesList),
    switchMap(() =>
      this.responsibilityService.getResponsibilities()),
    map((listResponsibilities) =>
      actions.responsibilitiesListSuccess({listResponsibilities})
    ),
    catchError((errorResponse: HttpErrorResponse) =>
      of(actions.responsibilitiesListFailure({errors: errorResponse.error}))
    )
  ));

  constructor(private actions$: Actions,
              private store: Store,
              private employeesService: EmployeesService,
              private skillsService: SkillsService,
              private languageService: EmplLanguageService,
              private responsibilityService: ResponsibilityService
  ) {
  }
}