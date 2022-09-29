import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../action-types";
import {CurrentUserInterface} from '@models/current-user.interface';

export const getCurrentUserAction = createAction(
    ActionTypes.GET_CURRENT_USER
)

export const getCurrentUserSuccessAction = createAction(
    ActionTypes.GET_CURRENT_USER_SUCCESS,
    props<{currentUser: CurrentUserInterface}>()
)

export const getCurrentUserFailureAction = createAction(
    ActionTypes.GET_CURRENT_USER_FAILURE
)