import {AuthStateInterface} from "./auth/models/auth-state.interface";
import {ActionReducerMap} from "@ngrx/store";
import {authReducer} from "./auth/auth.reducer";
import { BreadcrumbsState } from '../shared/models/interfaces/breadcrumbs.state.interface';
import { breadcrumbsReducer } from './breadcrumbs/breadcrumbs.reducers';

export interface AppState {
  auth: AuthStateInterface,
  breadcrumbs: BreadcrumbsState,
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  breadcrumbs: breadcrumbsReducer,
}
