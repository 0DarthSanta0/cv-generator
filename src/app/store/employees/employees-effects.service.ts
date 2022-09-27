import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeesService } from '../../shared/services/http/employees.service';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
    employeesListAction,
    employeesListFailureAction,
    employeesListSuccessAction,
    skillsListAction,
    skillsListFailureAction,
    skillsListSuccessAction
} from './actions/employees-table.action';
import { SkillsService } from '../../shared/services/http/skills.service';
import { select, Store } from '@ngrx/store';
import { listSkillsSelector } from './employees.selectors';
import { EmployeesInterface, IEmployeesWithSkills } from '../../shared/models/employees.interface';
import { EmployeesMapperService } from '../../shared/utils/employees-mapper.service';

@Injectable()
export class EmployeesEffects {

    public getListEmployees$ = createEffect(() => this.actions$.pipe(
        ofType(employeesListAction),
        switchMap(() =>
            this.employeesService.getListEmployees()),
        withLatestFrom(this.store.pipe(select(listSkillsSelector))),
        map(([listEmployees, skills]) => (this.employeeMappers.employeeWithSkills(listEmployees, skills))),
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

    constructor(private actions$: Actions,
                private store: Store,
                private employeesService: EmployeesService,
                private skillsService: SkillsService,
                private employeeMappers: EmployeesMapperService
    ) {
    }
}