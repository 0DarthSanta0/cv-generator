import { createReducer, on } from '@ngrx/store';
import { EmployeesStateInterface } from './models/employees-state.interface';
import {
    employeeByIdAction,
    employeeByIdFailureAction,
    employeeByIdSuccessAction,
    employeesListAction,
    employeesListFailureAction,
    employeesListSuccessAction,
    languagesListAction,
    languagesListFailureAction,
    languagesListSuccessAction,
    positionsListAction, positionsListFailureAction, positionsListSuccessAction,
    skillsListAction,
    skillsListFailureAction,
    skillsListSuccessAction
} from './employees.actions';

const initialState: EmployeesStateInterface = {
    isLoading: false,
    employeesList: [],
    skillsList: [],
    languagesList: [],
    positionsList: [],
    employeeDTO: null,
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
            errors: action.errors,
        })
    ),
    on(
        languagesListAction, (state): EmployeesStateInterface => ({
            ...state,
            isLoading: true,
        })
    ),
    on(
        languagesListSuccessAction, (state, action): EmployeesStateInterface => ({
            ...state,
            isLoading: false,
            languagesList: action.listLanguages,
            errors: null,
        })
    ),
    on(
        languagesListFailureAction, (state, action): EmployeesStateInterface => ({
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
            employeeDTO: action.employeeDTO,
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