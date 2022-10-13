import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeesService } from '@services/http/employees.service';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
    employeeByIdAction,
    employeeByIdFailureAction,
    employeeByIdSuccessAction,
    employeesListAction,
    employeesListFailureAction,
    employeesListSuccessAction,
    employeeUpdateAction,
    employeeUpdateFailureAction,
    employeeUpdateSuccessAction,
    languagesListAction,
    languagesListFailureAction,
    languagesListSuccessAction,
    positionsListAction,
    positionsListFailureAction,
    positionsListSuccessAction,
    skillsListAction,
    skillsListFailureAction,
    skillsListSuccessAction
} from './employees.actions';
import { SkillsService } from '@services/http/skills.service';
import { select, Store } from '@ngrx/store';
import { listLanguagesSelector, listPositionsSelector, listSkillsSelector } from './employees.selectors';
import { EmployeesMapperService } from '@services/employees-mapper.service';
import { EmplLanguageService } from '@services/http/empl-language.service';
import { EmployeesInterface } from '@models/employees.interface';
import { PositionService } from '@services/http/position.service';

@Injectable()
export class EmployeesEffects {

    public employeesList$ = createEffect(() => this.actions$.pipe(
        ofType(employeesListAction),
        switchMap(() => this.employeesService.getListEmployees()),
        withLatestFrom(this.store.pipe(select(listSkillsSelector))),
        map(([listEmployees, skills]) => (this.employeeMappers.getEmployeesWithSkills(listEmployees, skills))),
        map((listEmployees) =>
            employeesListSuccessAction({listEmployees})
        ),
        catchError((errorResponse: HttpErrorResponse) =>
            of(employeesListFailureAction({errors: errorResponse.error}))
        )
    ));

    public skillsList$ = createEffect(() => this.actions$.pipe(
        ofType(skillsListAction),
        switchMap(() =>
            this.skillsService.getListSkills()),
        map((listSkills) =>
            skillsListSuccessAction({listSkills})
        ),
        catchError((errorResponse: HttpErrorResponse) =>
            of(skillsListFailureAction({errors: errorResponse.error}))
        )
    ));

    public languagesList$ = createEffect(() => this.actions$.pipe(
        ofType(languagesListAction),
        switchMap(() =>
            this.languageService.getListLanguage()),
        map((listLanguages) =>
            languagesListSuccessAction({listLanguages})
        ),
        catchError((errorResponse: HttpErrorResponse) =>
            of(languagesListFailureAction({errors: errorResponse.error}))
        )
    ));

    public positionsList$ = createEffect(() => this.actions$.pipe(
        ofType(positionsListAction),
        switchMap(() =>
            this.positionService.getListPositions()),
        map((listPositions) =>
            positionsListSuccessAction({listPositions})
        ),
        catchError((errorResponse: HttpErrorResponse) =>
            of(positionsListFailureAction({errors: errorResponse.error}))
        )
    ));

    public employeeById$ = createEffect(() => this.actions$.pipe(
            ofType(employeeByIdAction),
            switchMap(({id}) => this.employeesService.getEmployeeById(id)),
            withLatestFrom(this.store.pipe(select(listLanguagesSelector)), this.store.pipe(select(listSkillsSelector))),
            map(([employee, languages, skills]) => this.employeeMappers.getEmployeeDTO(employee, skills, languages)),
            map((employeeDTO) => {
                return employeeByIdSuccessAction({employeeDTO});
            }),
            catchError((errorResponse: HttpErrorResponse) =>
                of(employeeByIdFailureAction({errors: errorResponse.error}))
            )
        )
    );

    public employeeUpdate$ = createEffect(() => this.actions$.pipe(
        ofType(employeeUpdateAction),
        withLatestFrom(
            this.store.pipe(select(listLanguagesSelector)),
            this.store.pipe(select(listSkillsSelector)),
            this.store.pipe(select(listPositionsSelector)),
        ),
        map(([{newEmployee}, languages, skills, positions]) => this.employeeMappers.employeeDTOToEmployee(newEmployee, skills, languages, positions)),
        switchMap((mappedEmployee: EmployeesInterface) => this.employeesService.updateEmployee(mappedEmployee)),
        map(() => employeeUpdateSuccessAction()),
        catchError((errorResponse: HttpErrorResponse) =>
            of(employeeUpdateFailureAction({errors: errorResponse.error}))
        )
    ));

    constructor(private actions$: Actions,
                private store: Store,
                private employeesService: EmployeesService,
                private skillsService: SkillsService,
                private languageService: EmplLanguageService,
                private positionService: PositionService,
                private employeeMappers: EmployeesMapperService
    ) {
    }
}