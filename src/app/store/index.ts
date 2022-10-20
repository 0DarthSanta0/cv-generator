import { AuthStateInterface } from './auth/models/auth-state.interface';
import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { EmployeesStateInterface } from './employees/models/employees-state.interface';
import { employeesReducer } from './employees/employees.reducer';
import { BreadcrumbsState } from '@models/interfaces/breadcrumbs.state.interface';
import { breadcrumbsReducer } from './breadcrumbs/breadcrumbs.reducers';
import { IMainState } from '@ourStore/main/models/main-state.interface';
import { mainReducer } from '@ourStore/main/main.reducer';

export interface AppState {
  auth: AuthStateInterface,
  employees: EmployeesStateInterface,
  breadcrumbs: BreadcrumbsState,
  main: IMainState
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  employees: employeesReducer,
  breadcrumbs: breadcrumbsReducer,
  main: mainReducer
}
