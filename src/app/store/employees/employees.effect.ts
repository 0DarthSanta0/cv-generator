import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeesService } from '../../shared/services/http/employees.service';
import { catchError, map, of, switchMap } from 'rxjs';
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

@Injectable()
export class EmployeesEffect {

    public getListEmployees$ = createEffect(() => this.actions$.pipe(
        ofType(employeesListAction),
        switchMap(() =>
            this.employeesService.getListEmployees()),
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
                private employeesService: EmployeesService,
                private skillsService: SkillsService,
    ) {
    }
}