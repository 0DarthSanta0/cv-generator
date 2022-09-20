import {createFeatureSelector, createSelector} from "@ngrx/store";
import {EmployeesStateInterface} from "./models/employees-state.interface";

export const authFeatureSelector = createFeatureSelector<EmployeesStateInterface>('employees');

export const isLoadingSelector = createSelector(
    authFeatureSelector,
    (employeesState: EmployeesStateInterface) => employeesState.isLoading
);

export const listEmployeesSelector = createSelector(
    authFeatureSelector,
    (employeesState: EmployeesStateInterface) => employeesState.employeesList
);

export const errorsSelector = createSelector(
    authFeatureSelector,
    (employeesState: EmployeesStateInterface) => employeesState.errors
);