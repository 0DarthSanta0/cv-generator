import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {EmployeesService} from "../../shared/services/http/employees.service";
import {catchError, map, of, switchMap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {
  employeesListAction,
  employeesListFailureAction,
  employeesListSuccessAction
} from "./actions/employees-table.action";

@Injectable()
export class EmployeesEffect {

  getListEmployees$ = createEffect(() => this.actions$.pipe(
      ofType(employeesListAction),
      switchMap(() => {
        return this.employeesService.getListEmployees().pipe(
            map((listEmployees) => {
              return employeesListSuccessAction({listEmployees});
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(employeesListFailureAction({errors: errorResponse.error.error}))
            })
        )
      })
  ));

  constructor(private actions$: Actions,
              private employeesService: EmployeesService
  ) {
  }
}