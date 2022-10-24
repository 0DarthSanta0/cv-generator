import { createAction, props } from '@ngrx/store';
import { BackendErrorsInterface } from '@models/backend-errors.interface';
import { EmployeesActionTypes } from './employees-action-types';
import { IEmployeesWithSkills } from '@models/employees.interface';
import { SkillInterface } from '@models/skill.interface';
import { EmployeeInfoDtoInterface } from '@models/interfaces/employee-info-dto.interface';
import { LanguageInterface } from '@models/interfaces/language.interface';
import { IEmployeeFormDto } from '@employees';
import { PositionInterface } from '@models/interfaces/position.interface';

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



export const positionsListAction = createAction(
    EmployeesActionTypes.POSITIONS_LIST
)

export const positionsListSuccessAction = createAction(
    EmployeesActionTypes.POSITIONS_LIST_SUCCESS,
    props<{ listPositions: PositionInterface[] }>()
)

export const positionsListFailureAction = createAction(
    EmployeesActionTypes.POSITIONS_LIST_FAILURE,
    props<{ errors: BackendErrorsInterface }>()
)

export const employeeByIdAction = createAction(
    EmployeesActionTypes.EMPLOYEE_BY_ID,
    props<{ id: number }>()
)

export const employeeByIdSuccessAction = createAction(
    EmployeesActionTypes.EMPLOYEE_BY_ID_SUCCESS,
    props<{ employeeDto: EmployeeInfoDtoInterface }>()
)

export const employeeByIdFailureAction = createAction(
    EmployeesActionTypes.EMPLOYEE_BY_ID_FAILURE,
    props<{ errors: BackendErrorsInterface }>()
)

export const employeeUpdateAction = createAction(
    EmployeesActionTypes.EMPLOYEE_UPDATE,
    props<{ newEmployee: IEmployeeFormDto }>()
)

export const employeeUpdateSuccessAction = createAction(
    EmployeesActionTypes.EMPLOYEE_UPDATE_SUCCESS,
)

export const employeeUpdateFailureAction = createAction(
    EmployeesActionTypes.EMPLOYEE_UPDATE_FAILURE,
    props<{ errors: BackendErrorsInterface }>()
)