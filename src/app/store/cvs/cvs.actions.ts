import { createAction, props } from '@ngrx/store';
import { BackendErrorsInterface } from '@models/backend-errors.interface';
import { ActionTypes } from '@ourStore/cvs/enums/action-types';
import { CVsInterface } from '@models/interfaces/cvs.interface';

export const getCVsList = createAction(
  ActionTypes.GET_CVS_LIST,
)

export const getCVsListSuccess = createAction(
  ActionTypes.GET_CVS_LIST_SUCCESS,
  props<{ cvsList: CVsInterface[] }>()
)

export const getCVsListFail = createAction(
  ActionTypes.GET_CVS_LIST_FAIL,
  props<{ errors: BackendErrorsInterface }>()
)

export const getCVById = createAction(
  ActionTypes.GET_CV_BY_ID,
  props<{ id: number }>()
)

export const getCVByIdSuccess = createAction(
  ActionTypes.GET_CV_BY_ID_SUCCESS,
  props<{ cv: CVsInterface }>()
)

export const getCVByIdFail = createAction(
  ActionTypes.GET_CV_BY_ID_FAIL,
  props<{ errors: BackendErrorsInterface }>()
)

export const updateCV = createAction(
  ActionTypes.UPDATE_CV,
  props<{ newCV: CVsInterface }>()
)

export const updateCVSuccess = createAction(
  ActionTypes.UPDATE_CV_SUCCESS,
)

export const updateCVFail = createAction(
  ActionTypes.UPDATE_CV_FAIL,
  props<{ errors: BackendErrorsInterface }>()
)


export const postCV = createAction(
  ActionTypes.POST_CV,
  props<{ newCV: CVsInterface }>()
)

export const postCVSuccess = createAction(
  ActionTypes.POST_CV_SUCCESS,
)

export const postCVFail = createAction(
  ActionTypes.POST_CV_FAIL,
  props<{ errors: BackendErrorsInterface }>()
)

export const deleteCV = createAction(
  ActionTypes.DELETE_CV,
  props<{ id: number }>()
)

export const deleteCVSuccess = createAction(
  ActionTypes.DELETE_CV_SUCCESS,
)

export const deleteCVFail = createAction(
  ActionTypes.DELETE_CV_FAIL,
  props<{ errors: BackendErrorsInterface }>()
)
