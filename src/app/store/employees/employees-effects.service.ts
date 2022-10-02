import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeesService } from '@services/http/employees.service';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
    employeeByIdAction, employeeByIdFailureAction, employeeByIdSuccessAction,
    employeesListAction,
    employeesListFailureAction,
    employeesListSuccessAction, languagesListAction, languagesListFailureAction, languagesListSuccessAction,
    skillsListAction,
    skillsListFailureAction,
    skillsListSuccessAction
} from './employees.actions';
import { SkillsService } from '@services/http/skills.service';
import { select, Store } from '@ngrx/store';
import { listLanguagesSelector, listSkillsSelector } from './employees.selectors';
import { EmployeesMapperService } from '@utils/employees-mapper.service';
import { EmplLanguageService } from '@services/http/empl-language.service';

@Injectable()
export class EmployeesEffects {

    public getListEmployees$ = createEffect(() => this.actions$.pipe(
        ofType(employeesListAction),
        switchMap(() =>
            this.employeesService.getListEmployees()),
        withLatestFrom(this.store.pipe(select(listSkillsSelector))),
        map(([listEmployees, skills]) => (this.employeeMappers.getEmployeesWithSkills(listEmployees, skills))),
        map((listEmployees) =>
            employeesListSuccessAction({listEmployees})
        ),
        catchError((errorResponse: HttpErrorResponse) =>
            of(employeesListFailureAction({errors: errorResponse.error.error}))
        )
    ));

    public getListSkills$ = createEffect(() => this.actions$.pipe(
        ofType(skillsListAction),
        switchMap(() =>
            this.skillsService.getListSkills()),
        map((listSkills) =>
            skillsListSuccessAction({listSkills})
        ),
        catchError((errorResponse: HttpErrorResponse) =>
            of(skillsListFailureAction({errors: errorResponse.error.error}))
        )
    ));

    public getListLanguages$ = createEffect(() => this.actions$.pipe(
        ofType(languagesListAction),
        switchMap(() =>
            this.languageService.getListLanguage()),
        map((listLanguages) =>
            languagesListSuccessAction({listLanguages})
        ),
        catchError((errorResponse: HttpErrorResponse) =>
            of(languagesListFailureAction({errors: errorResponse.error.error}))
        )
    ));

    public getEmployeeDTOById = createEffect(() => this.actions$.pipe(
            ofType(employeeByIdAction),
            switchMap(({id}) => this.employeesService.getEmployeeById(id)),
            withLatestFrom(this.store.pipe(select(listLanguagesSelector)), this.store.pipe(select(listSkillsSelector))),
            map(([employee, languages, skills]) => this.employeeMappers.getEmployeeDTO(employee,skills, languages)),
            map((employeeDTO) => {
                return employeeByIdSuccessAction({employeeDTO});
            }),
            catchError((errorResponse: HttpErrorResponse) => {
                return of(employeeByIdFailureAction({errors: errorResponse.error.error}))
            })
        )
    )

    constructor(private actions$: Actions,
                private store: Store,
                private employeesService: EmployeesService,
                private skillsService: SkillsService,
                private languageService: EmplLanguageService,
                private employeeMappers: EmployeesMapperService
    ) {
    }
}