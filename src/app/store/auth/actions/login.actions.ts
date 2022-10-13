import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../action-types";
import {LoginRequestInterface} from "../models/login-request.interface";
import { UserInterface } from '@models/user.interface';
import { BackendErrorsInterface } from '@models/backend-errors.interface';

export const loginAction = createAction(
    ActionTypes.LOGIN,
    props<{request: LoginRequestInterface}>()
)

export const loginSuccessAction = createAction(
    ActionTypes.LOGIN_SUCCESS,
    props<{ currentUser: UserInterface }>()
)

export const loginFailureAction = createAction(
    ActionTypes.LOGIN_FAILURE,
    props<{ errors: BackendErrorsInterface }>()
)