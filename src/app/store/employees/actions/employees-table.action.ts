import { createAction, props } from '@ngrx/store';
import { BackendErrorsInterface } from '@models/backend-errors.interface';
import { EmployeesActionTypes } from '../employees-action-types';
import { IEmployeesWithSkills } from '@models/employees.interface';
import { SkillInterface } from '@models/skill.interface';

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