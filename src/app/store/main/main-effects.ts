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
import * as actionsEntities from '@ourStore/entities/entities-actions';
import {
  addLanguageSuccess,
  addResponsibilitySuccess,
  addSkill,
  addSkillFailure,
  addSkillSuccess,
  deleteLanguageSuccess,
  deleteResponsibilitySuccess,
  deleteSkillSuccess,
  updateLanguageSuccess,
  updateResponsibilitySuccess,
  updateSkillSuccess
} from '@ourStore/entities/entities-actions';

@Injectable()
export class MainEffects {

  public skillsList$ = createEffect(() => this.actions$.pipe(
    ofType(actions.skillsList, addSkillSuccess, updateSkillSuccess, deleteSkillSuccess),
    switchMap(() => this.skillsService.getListSkills()),
    map((listSkills) => actions.skillsListSuccess({listSkills})),
    catchError((errorResponse: HttpErrorResponse) =>
      of(actions.skillsListFailure({errors: errorResponse.error}))
    )
  ));

  public languagesList$ = createEffect(() => this.actions$.pipe(
    ofType(actions.languagesList, addLanguageSuccess, updateLanguageSuccess, deleteLanguageSuccess),
    switchMap(() => this.languageService.getListLanguage()),
    map((listLanguages) => actions.languagesListSuccess({listLanguages})),
    catchError((errorResponse: HttpErrorResponse) =>
      of(actions.languagesListFailure({errors: errorResponse.error}))
    )
  ));

  public responsibilitiesList = createEffect(() => this.actions$.pipe(
    ofType(actions.responsibilitiesList, addResponsibilitySuccess, updateResponsibilitySuccess, deleteResponsibilitySuccess),
    switchMap(() => this.responsibilityService.getResponsibilities()),
    map((listResponsibilities) => actions.responsibilitiesListSuccess({listResponsibilities})),
    catchError((errorResponse: HttpErrorResponse) =>
      of(actions.responsibilitiesListFailure({errors: errorResponse.error}))
    )
  ));

  public deleteSkill$ = createEffect(() => this.actions$.pipe(
    ofType(actionsEntities.deleteSkill),
    switchMap(({id}) => this.skillsService.deleteSkill(id)),
    map(() => actionsEntities.deleteSkillSuccess()),
    catchError((errorResponse: HttpErrorResponse) =>
      of(actionsEntities.deleteSkillFailure({errors: errorResponse.error}))
    )
  ));

  public deleteLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(actionsEntities.deleteLanguage),
    switchMap(({id}) => this.languageService.deleteLanguage(id)),
    map(() => actionsEntities.deleteLanguageSuccess()),
    catchError((errorResponse: HttpErrorResponse) =>
      of(actionsEntities.deleteLanguageFailure({errors: errorResponse.error}))
    )
  ));

  public deleteResponsibility$ = createEffect(() => this.actions$.pipe(
    ofType(actionsEntities.deleteResponsibility),
    switchMap(({id}) => this.responsibilityService.deleteResponsibilities(id)),
    map(() => actionsEntities.deleteResponsibilitySuccess()),
    catchError((errorResponse: HttpErrorResponse) =>
      of(actionsEntities.deleteResponsibilityFailure({errors: errorResponse.error}))
    )
  ));

  public addSkill$ = createEffect(() => this.actions$.pipe(
    ofType(addSkill),
    switchMap(({name}) => this.skillsService.addSkill(name)),
    map(() => addSkillSuccess()),
    catchError((errorResponse: HttpErrorResponse) =>
      of(addSkillFailure({errors: errorResponse.error}))
    )
  ));

  public addResponsibility$ = createEffect(() => this.actions$.pipe(
    ofType(actionsEntities.addResponsibility),
    switchMap(({name}) =>
      this.responsibilityService.addResponsibility(name)),
    map(() => actionsEntities.addResponsibilitySuccess()),
    catchError((errorResponse: HttpErrorResponse) =>
      of(actionsEntities.addResponsibilityFailure({errors: errorResponse.error}))
    )
  ));

  public addLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(actionsEntities.addLanguage),
    switchMap(({name}) => this.languageService.addLanguage(name)),
    map(() => actionsEntities.addLanguageSuccess()),
    catchError((errorResponse: HttpErrorResponse) =>
      of(actionsEntities.addLanguageFailure({errors: errorResponse.error}))
    )
  ));

  public updateSkill$ = createEffect(() => this.actions$.pipe(
    ofType(actionsEntities.updateSkill),
    switchMap(({id, name}) => this.skillsService.updateSkill(id, name)),
    map(() => actionsEntities.updateSkillSuccess()),
    catchError((errorResponse: HttpErrorResponse) =>
      of(actionsEntities.addSkillFailure({errors: errorResponse.error}))
    )
  ));

  public updateLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(actionsEntities.updateLanguage),
    switchMap(({id, name}) => this.languageService.updateLanguage(id, name)),
    map(() => actionsEntities.updateLanguageSuccess()),
    catchError((errorResponse: HttpErrorResponse) =>
      of(actionsEntities.updateLanguageFailure({errors: errorResponse.error}))
    )
  ));

  public updateResponsibility$ = createEffect(() => this.actions$.pipe(
    ofType(actionsEntities.updateResponsibility),
    switchMap(({id, name}) => this.responsibilityService.updateResponsibility(id, name)),
    map(() => actionsEntities.updateResponsibilitySuccess()),
    catchError((errorResponse: HttpErrorResponse) =>
      of(actionsEntities.updateResponsibilityFailure({errors: errorResponse.error}))
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