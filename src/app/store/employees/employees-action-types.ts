export enum EmployeesActionTypes {
  EMPLOYEES_LIST = '[Employees] Get employees list',
  EMPLOYEES_LIST_SUCCESS = '[Employees] Get employees list success',
  EMPLOYEES_LIST_FAILURE = '[Employees] Get employees list failure',

  POSITIONS_LIST = '[Employees] Get positions list',
  POSITIONS_LIST_SUCCESS = '[Employees] Get positions list success',
  POSITIONS_LIST_FAILURE = '[Employees] Get positions list failure',

  EMPLOYEE_BY_ID = '[Employee] Get employee by id',
  EMPLOYEE_BY_ID_SUCCESS = '[Employee] Get employee by id success',
  EMPLOYEE_BY_ID_FAILURE = '[Employee] Get employee by id failure',

  EMPLOYEE_UPDATE = '[Employee] Update employee',
  EMPLOYEE_UPDATE_SUCCESS = '[Employee] Update employee success',
  EMPLOYEE_UPDATE_FAILURE = '[Employee] Update employee failure',
}