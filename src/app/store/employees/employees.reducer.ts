import { createReducer, on } from '@ngrx/store';
import { EmployeesStateInterface } from './models/employees-state.interface';
import {
    employeesListAction,
    employeesListFailureAction,
    employeesListSuccessAction,
    skillsListAction,
    skillsListFailureAction,
    skillsListSuccessAction
} from './actions/employees-table.action';

const initialState: EmployeesStateInterface = {
    isLoading: false,
    employeesList: [],
    skillsList: [],
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
            employeesList: [],
            errors: action.errors,
        })
    ),
    on(
        skillsListAction, (state): EmployeesStateInterface => ({
            ...state,
            isLoading: true,
        })
    ),
    on(
        skillsListSuccessAction, (state, action): EmployeesStateInterface => ({
            ...state,
            isLoading: false,
            skillsList: action.listSkills,
            errors: null,
        })
    ),
    on(
        skillsListFailureAction, (state, action): EmployeesStateInterface => ({
            ...state,
            isLoading: false,
            employeesList: [],
            skillsList: [],
            errors: action.errors,
        })
    ),
);