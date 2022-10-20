import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
  languagesList, languagesListFailure,
  languagesListSuccess, responsibilitiesList, responsibilitiesListFailure, responsibilitiesListSuccess,
  skillsList,
  skillsListFailure,
  skillsListSuccess
} from '@ourStore/main/main-actions';
import { Store } from '@ngrx/store';
import { EmployeesService } from '@services/http/employees.service';
import { SkillsService } from '@services/http/skills.service';
import { EmplLanguageService } from '@services/http/empl-language.service';
import { PositionService } from '@services/http/position.service';
import { EmployeesMapperService } from '@services/employees-mapper.service';
import { ResponsibilityService } from '@services/http/responsibility.service';

@Injectable()
export class MainEffects {

  public skillsList$ = createEffect(() => this.actions$.pipe(
    ofType(skillsList),
    switchMap(() =>
      this.skillsService.getListSkills()),
    map((listSkills) =>
      skillsListSuccess({listSkills})
    ),
    catchError((errorResponse: HttpErrorResponse) =>
      of(skillsListFailure({errors: errorResponse.error}))
    )
  ));

  public languagesList$ = createEffect(() => this.actions$.pipe(
    ofType(languagesList),
    switchMap(() =>
      this.languageService.getListLanguage()),
    map((listLanguages) =>
      languagesListSuccess({listLanguages})
    ),
    catchError((errorResponse: HttpErrorResponse) =>
      of(languagesListFailure({errors: errorResponse.error}))
    )
  ));

  public responsibilitiesList = createEffect(() => this.actions$.pipe(
    ofType(responsibilitiesList),
    switchMap(() =>
      this.responsibilityService.getResponsibilities()),
    map((listResponsibilities) =>
      responsibilitiesListSuccess({listResponsibilities})
    ),
    catchError((errorResponse: HttpErrorResponse) =>
      of(responsibilitiesListFailure({errors: errorResponse.error}))
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