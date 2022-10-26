import { createReducer, on } from '@ngrx/store';
import { EmployeesStateInterface } from './models/employees-state.interface';
import {
  employeeByIdAction,
  employeeByIdFailureAction,
  employeeByIdSuccessAction,
  employeeCvsList,
  employeeCvsListSuccess,
  employeesListAction,
  employeesListFailureAction,
  employeesListSuccessAction,
  openCv,
  openCvFailure,
  openCvSuccess,
  positionsListAction,
  positionsListFailureAction,
  positionsListSuccessAction,
  setCvTemplateToEmployee,
  setCvTemplateToEmployeeFailure,
  setCvTemplateToEmployeeSuccess,
} from './employees.actions';
import { EmployeeInfoDtoInterface } from '@models/interfaces/employee-info-dto.interface';
import { EmployeeCvDtoInterface } from '@models/interfaces/employee-cv-dto.interface';

const initialState: EmployeesStateInterface = {
  isLoading: false,
  employeesList: [],
  positionsList: [],
  cvsList: [],
  employeeDto: {} as EmployeeInfoDtoInterface,
  employeeCvDto: {} as EmployeeCvDtoInterface,
  errors: null,
}

export const employeesReducer = createReducer(
  initialState,
  on(
    employeesListAction, employeeCvsList, setCvTemplateToEmployee, employeeByIdAction, positionsListAction, openCv, (state): EmployeesStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    employeesListFailureAction, positionsListFailureAction, employeeByIdFailureAction, setCvTemplateToEmployeeFailure, openCvFailure, (state, action): EmployeesStateInterface => ({
      ...state,
      isLoading: false,
      errors: action.errors,
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
    positionsListSuccessAction, (state, action): EmployeesStateInterface => ({
      ...state,
      isLoading: false,
      positionsList: action.listPositions,
      errors: null,
    })
  ),
  on(
    setCvTemplateToEmployeeSuccess, (state, action): EmployeesStateInterface => ({
      ...state,
      isLoading: false,
      errors: null,
    })
  ),
  on(
    openCvSuccess, (state, action): EmployeesStateInterface => ({
      ...state,
      isLoading: false,
      employeeCvDto: action.employeeCv,
      errors: null,
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
    employeeCvsListSuccess, (state, action): EmployeesStateInterface => ({
      ...state,
      cvsList: action.cvsList
    })
  ),
);