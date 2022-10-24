import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import * as actions from '@ourStore/entities/entities-actions';
import { Store } from '@ngrx/store';
import { EmployeesService } from '@services/http/employees.service';
import { SkillsService } from '@services/http/skills.service';
import { EmplLanguageService } from '@services/http/empl-language.service';
import { ResponsibilityService } from '@services/http/responsibility.service';

@Injectable()
export class EntitiesEffects {

  public deleteSkill$ = createEffect(() => this.actions$.pipe(
    ofType(actions.deleteSkill),
    switchMap(({id}) =>
      this.skillsService.deleteSkill(id)),
    map(() => actions.deleteSkillSuccess()),
    catchError((errorResponse: HttpErrorResponse) =>
      of(actions.deleteSkillFailure({errors: errorResponse.error}))
    )
  ));

  public deleteLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(actions.deleteLanguage),
    switchMap(({id}) =>
      this.languageService.deleteLanguage(id)),
    map(() => actions.deleteLanguageSuccess()),
    catchError((errorResponse: HttpErrorResponse) =>
      of(actions.deleteLanguageFailure({errors: errorResponse.error}))
    )
  ));

  public deleteResponsibility$ = createEffect(() => this.actions$.pipe(
    ofType(actions.deleteResponsibility),
    switchMap(({id}) =>
      this.responsibilityService.deleteResponsibilities(id)),
    map(() => actions.deleteResponsibilitySuccess()),
    catchError((errorResponse: HttpErrorResponse) =>
      of(actions.deleteResponsibilityFailure({errors: errorResponse.error}))
    )
  ));

  public addResponsibility$ = createEffect(() => this.actions$.pipe(
    ofType(actions.addResponsibility),
    switchMap(({name}) =>
      this.responsibilityService.addResponsibility(name)),
    map(() => actions.addResponsibilitySuccess()),
    catchError((errorResponse: HttpErrorResponse) =>
      of(actions.addResponsibilityFailure({errors: errorResponse.error}))
    )
  ));

  public addSkill$ = createEffect(() => this.actions$.pipe(
    ofType(actions.addSkill),
    switchMap(({name}) =>
      this.skillsService.addSkill(name)),
    map(() => actions.addSkillSuccess()),
    catchError((errorResponse: HttpErrorResponse) =>
      of(actions.addSkillFailure({errors: errorResponse.error}))
    )
  ));

  public addLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(actions.addLanguage),
    switchMap(({name}) =>
      this.languageService.addLanguage(name)),
    map(() => actions.addLanguageSuccess()),
    catchError((errorResponse: HttpErrorResponse) =>
      of(actions.addLanguageFailure({errors: errorResponse.error}))
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