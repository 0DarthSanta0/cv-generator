import {createAction, props} from "@ngrx/store";
import {BackendErrorsInterface} from "../../../shared/models/backend-errors.interface";
import {EmployeesActionTypes} from "../employees-action-types";
import { EmployeesInterface } from '../../../shared/models/interfaces/employees.interface';

export const employeesListAction = createAction(
    EmployeesActionTypes.EMPLOYEES_LIST
)

export const employeesListSuccessAction = createAction(
    EmployeesActionTypes.EMPLOYEES_LIST_SUCCESS,
    props<{ listEmployees: EmployeesInterface[] }>()
)

export const employeesListFailureAction = createAction(
    EmployeesActionTypes.EMPLOYEES_LIST_FAILURE,
    props<{ errors: BackendErrorsInterface }>()
)