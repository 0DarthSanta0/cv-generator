import { createAction, props } from '@ngrx/store';
import { BackendErrorsInterface } from '@models/backend-errors.interface';
import { EmployeesActionTypes } from './employees-action-types';
import { IEmployeesWithSkills } from '@models/employees.interface';
import { SkillInterface } from '@models/skill.interface';
import { EmployeeInfoDtoInterface } from '@models/interfaces/employee-info-dto.interface';
import { LanguageInterface } from '@models/interfaces/language.interface';

export const employeesListAction = createAction(
    EmployeesActionTypes.EMPLOYEES_LIST
)

export const employeesListSuccessAction = createAction(
    EmployeesActionTypes.EMPLOYEES_LIST_SUCCESS,
    props<{ listEmployees: IEmployeesWithSkills[] }>()
)

export const employeesListFailureAction = createAction(
    EmployeesActionTypes.EMPLOYEES_LIST_FAILURE,
    props<{ errors: BackendErrorsInterface }>()
)

export const skillsListAction = createAction(
    EmployeesActionTypes.SKILLS_LIST
)

export const skillsListSuccessAction = createAction(
    EmployeesActionTypes.SKILLS_LIST_SUCCESS,
    props<{ listSkills: SkillInterface[] }>()
)

export const skillsListFailureAction = createAction(
    EmployeesActionTypes.SKILLS_LIST_FAILURE,
    props<{ errors: BackendErrorsInterface }>()
)

export const languagesListAction = createAction(
    EmployeesActionTypes.LANGUAGES_LIST
)

export const languagesListSuccessAction = createAction(
    EmployeesActionTypes.LANGUAGES_LIST_SUCCESS,
    props<{ listLanguages: LanguageInterface[] }>()
)

export const languagesListFailureAction = createAction(
    EmployeesActionTypes.LANGUAGES_LIST_FAILURE,
    props<{ errors: BackendErrorsInterface }>()
)

export const employeeByIdAction = createAction(
    EmployeesActionTypes.EMPLOYEE_BY_ID,
    props<{ id: number }>()
)

export const employeeByIdSuccessAction = createAction(
    EmployeesActionTypes.EMPLOYEE_BY_ID_SUCCESS,
    props<{ employeeDTO: EmployeeInfoDtoInterface }>()
)

export const employeeByIdFailureAction = createAction(
    EmployeesActionTypes.EMPLOYEE_BY_IDT_FAILURE,
    props<{ errors: BackendErrorsInterface }>()
)