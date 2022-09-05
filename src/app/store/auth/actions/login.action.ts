import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../action-types";
import {LoginRequestInterface} from "../models/login-request.interface";
import {CurrentUserInterface} from "../../../shared/models/current-user.interface";
import {BackendErrorsInterface} from "../../../shared/models/backend-errors.interface";

export const loginAction = createAction(
    ActionTypes.LOGIN,
    props<{request: LoginRequestInterface}>()
)

export const loginSuccessAction = createAction(
    ActionTypes.LOGIN_SUCCESS,
    props<{ currentUser: CurrentUserInterface }>()
)

export const loginFailureAction = createAction(
    ActionTypes.LOGIN_FAILURE,
    props<{ errors: BackendErrorsInterface }>()
)