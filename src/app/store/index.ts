import {AuthStateInterface} from "./auth/models/auth-state.interface";
import {ActionReducerMap} from "@ngrx/store";
import {authReducer} from "./auth/auth.reducer";

export interface AppState {
  auth: AuthStateInterface,
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer
}