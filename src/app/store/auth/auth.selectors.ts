import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthStateInterface} from "./models/auth-state.interface";

export const authFeatureSelector = createFeatureSelector<AuthStateInterface>('auth');

export const isSubmittingSelector = createSelector(
    authFeatureSelector,
    (authState: AuthStateInterface) => authState.isSubmitting
);

export const validationErrorsSelector = createSelector(
    authFeatureSelector,
    (authState: AuthStateInterface) => authState.validationErrors
);

export const isLoggedIn = createSelector(
    authFeatureSelector,
    (authState: AuthStateInterface) => authState.isLoggedIn
);

export const isLoading = createSelector(
    authFeatureSelector,
    (authState: AuthStateInterface) => authState.isLoading
);

export const getCurrentUser = createSelector(
    authFeatureSelector,
    (authState: AuthStateInterface) => authState.currentUser
);