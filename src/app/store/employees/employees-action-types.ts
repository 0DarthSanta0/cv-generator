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

  EMPLOYEE_CV_LIST = '[Employees] Get employee cv list',
  EMPLOYEE_CV_LIST_SUCCESS = '[Employees] Get employee cv list success',

  SET_CV_TEMPLATE_TO_EMPLOYEE = '[Employees] Set cv template to employee',
  SET_CV_TEMPLATE_TO_EMPLOYEE_SUCCESS = '[Employees] Set cv template to employee success',
  SET_CV_TEMPLATE_TO_EMPLOYEE_FAILURE = '[Employees] Set cv template to employee failure',

  OPEN_EMPLOYEE_CV = '[Employees] Open employee cv',
  OPEN_EMPLOYEE_CV_SUCCESS = '[Employees] Open employee cv success',
  OPEN_EMPLOYEE_CV_FAILURE = '[Employees] Open employee cv failure',
}