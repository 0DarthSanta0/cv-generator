import { AuthStateInterface } from './auth/models/auth-state.interface';
import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { EmployeesStateInterface } from './employees/models/employees-state.interface';
import { employeesReducer } from './employees/employees.reducer';
import { ProjectsStateInterface } from '@models/interfaces/projects.state.interface';
import { projectsReducers } from '@ourStore/projects/projects.reducers';

export interface AppState {
    auth: AuthStateInterface,
    employees: EmployeesStateInterface,
    projects: ProjectsStateInterface,
}

export const appReducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    employees: employeesReducer,
    projects: projectsReducers,
}
