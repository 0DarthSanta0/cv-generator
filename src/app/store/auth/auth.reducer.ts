import { AuthStateInterface } from './models/auth-state.interface';
import { createReducer, on } from '@ngrx/store';
import { registerAction, registerFailureAction, registerSuccessAction } from './actions/register.actions';
import { loginAction, loginFailureAction, loginSuccessAction } from './actions/login.actions';
import {
    getCurrentUserAction,
    getCurrentUserFailureAction,
    getCurrentUserSuccessAction
} from './actions/current-user.action';

const initialState: AuthStateInterface = {
    isSubmitting: false,
    isLoading: false,
    currentUser: null,
    isLoggedIn: null,
    validationErrors: null,
}

export const authReducer = createReducer(
    initialState,
    on(
        registerAction,loginAction, (state): AuthStateInterface => ({
            ...state,
            isSubmitting: true,
            validationErrors: null
        })
    ),
    on(
        registerSuccessAction,loginSuccessAction, getCurrentUserSuccessAction,(state, action): AuthStateInterface => ({
            ...state,
            isSubmitting: false,
            isLoggedIn: true,
            currentUser: action.currentUser,
        })
    ),
    on(
        registerFailureAction, loginFailureAction, (state, action): AuthStateInterface => ({
            ...state,
            isSubmitting: false,
            validationErrors: action.errors
        })
    ),
    on(
        getCurrentUserAction, (state): AuthStateInterface => ({
            ...state,
            isLoading: true
        })
    ),
    on(
        getCurrentUserFailureAction, (state, action): AuthStateInterface => ({
            ...state,
            isLoading: false,
            isLoggedIn: false,
            currentUser: null
        })
    ),
);