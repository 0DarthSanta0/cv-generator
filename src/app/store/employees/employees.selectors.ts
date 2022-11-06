import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeesStateInterface } from './models/employees-state.interface';

export const employeesFeatureSelector = createFeatureSelector<EmployeesStateInterface>('employees');

export const isLoadingSelector = createSelector(
    employeesFeatureSelector,
    (employeesState: EmployeesStateInterface) => employeesState.isLoading
);

export const listEmployeesSelector = createSelector(
    employeesFeatureSelector,
    (employeesState: EmployeesStateInterface) => employeesState.employeesList
);

export const listPositionsSelector = createSelector(
    employeesFeatureSelector,
    (employeesState: EmployeesStateInterface) => employeesState.positionsList
);

export const errorsSelector = createSelector(
    employeesFeatureSelector,
    (employeesState: EmployeesStateInterface) => employeesState.errors
);

export const employeeDtoSelector = createSelector(
    employeesFeatureSelector,
    (employeesState: EmployeesStateInterface) => employeesState.employeeDto
)

export const employeeCvsListSelector = createSelector(
  employeesFeatureSelector,
  (employeesState: EmployeesStateInterface) => employeesState.cvsList
)

export const selectEmployeeCv = createSelector(
  employeesFeatureSelector,
  (employeesState: EmployeesStateInterface) => employeesState.employeeCvDto
)