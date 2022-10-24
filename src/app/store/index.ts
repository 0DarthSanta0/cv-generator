import { AuthStateInterface } from './auth/models/auth-state.interface';
import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { EmployeesStateInterface } from './employees/models/employees-state.interface';
import { employeesReducer } from './employees/employees.reducer';
import { BreadcrumbsState } from '@models/interfaces/breadcrumbs.state.interface';
import { breadcrumbsReducer } from './breadcrumbs/breadcrumbs.reducers';
import { IMainState } from '@ourStore/main/models/main-state.interface';
import { mainReducer } from '@ourStore/main/main.reducer';
import { IEntitiesState } from '@ourStore/entities/models/entities-state.interface';
import { entitiesReducer } from '@ourStore/entities/entities.reducer';
import { ProjectsStateInterface } from '@models/interfaces/projects.state.interface';
import { projectsReducers } from '@ourStore/projects/projects.reducers';

export interface AppState {
  auth: AuthStateInterface,
  employees: EmployeesStateInterface,
  breadcrumbs: BreadcrumbsState,
  main: IMainState,
  entities: IEntitiesState
  projects: ProjectsStateInterface,
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  employees: employeesReducer,
  breadcrumbs: breadcrumbsReducer,
  projects: projectsReducers,
  main: mainReducer,
  entities: entitiesReducer
}
