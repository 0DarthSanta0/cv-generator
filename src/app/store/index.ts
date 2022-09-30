import { AuthStateInterface } from './auth/models/auth-state.interface';
import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { EmployeesStateInterface } from './employees/models/employees-state.interface';
import { employeesReducer } from './employees/employees.reducer';

export interface AppState {
    auth: AuthStateInterface,
    employees: EmployeesStateInterface
}

export const appReducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    employees: employeesReducer
}