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

export const listSkillsSelector = createSelector(
    employeesFeatureSelector,
    (employeesState: EmployeesStateInterface) => employeesState.skillsList
);

export const listLanguagesSelector = createSelector(
    employeesFeatureSelector,
    (employeesState: EmployeesStateInterface) => employeesState.languagesList
);

export const listPositionsSelector = createSelector(
    employeesFeatureSelector,
    (employeesState: EmployeesStateInterface) => employeesState.positionsList
);

export const errorsSelector = createSelector(
    employeesFeatureSelector,
    (employeesState: EmployeesStateInterface) => employeesState.errors
);

export const employeeDTOSelector = createSelector(
    employeesFeatureSelector,
    (employeesState: EmployeesStateInterface) => employeesState.employeeDTO
)