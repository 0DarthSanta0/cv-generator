import { createReducer, on } from '@ngrx/store';
import { EmployeesStateInterface } from './models/employees-state.interface';
import {
    employeeByIdAction,
    employeeByIdFailureAction,
    employeeByIdSuccessAction,
    employeesListAction,
    employeesListFailureAction,
    employeesListSuccessAction,
    positionsListAction, positionsListFailureAction, positionsListSuccessAction,

} from './employees.actions';

const initialState: EmployeesStateInterface = {
    isLoading: false,
    employeesList: [],
    positionsList: [],
    employeeDto: null,
    errors: null,
}

export const employeesReducer = createReducer(
    initialState,
    on(
        employeesListAction, (state): EmployeesStateInterface => ({
            ...state,
            isLoading: true,
        })
    ),
    on(
        employeesListSuccessAction, (state, action): EmployeesStateInterface => ({
            ...state,
            isLoading: false,
            employeesList: action.listEmployees,
            errors: null,
        })
    ),
    on(
        employeesListFailureAction, (state, action): EmployeesStateInterface => ({
            ...state,
            isLoading: false,
            errors: action.errors,
        })
    ),
    on(
        positionsListAction, (state): EmployeesStateInterface => ({
            ...state,
            isLoading: true,
        })
    ),
    on(
        positionsListSuccessAction, (state, action): EmployeesStateInterface => ({
            ...state,
            isLoading: false,
            positionsList: action.listPositions,
            errors: null,
        })
    ),
    on(
        positionsListFailureAction, (state, action): EmployeesStateInterface => ({
            ...state,
            isLoading: false,
            errors: action.errors,
        })
    ),
    on(
        employeeByIdAction, (state): EmployeesStateInterface => ({
            ...state,
            isLoading: true,
        })
    ),
    on(
        employeeByIdSuccessAction, (state, action): EmployeesStateInterface => ({
            ...state,
            isLoading: false,
            employeeDto: action.employeeDto,
            errors: null,
        })
    ),
    on(
        employeeByIdFailureAction, (state, action): EmployeesStateInterface => ({
            ...state,
            isLoading: false,
            errors: action.errors,
        })
    ),
);