import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../action-types";
import {RegisterRequestInterface} from "../models/register-request.interface";
import { UserInterface } from '@models/user.interface';
import { BackendErrorsInterface } from '@models/backend-errors.interface';

export const registerAction = createAction(
    ActionTypes.REGISTER,
    props<{ request: RegisterRequestInterface }>()
)

export const registerSuccessAction = createAction(
    ActionTypes.REGISTER_SUCCESS,
    props<{ currentUser: UserInterface }>()
)

export const registerFailureAction = createAction(
    ActionTypes.REGISTER_FAILURE,
    props<{ errors: BackendErrorsInterface }>()
)
