import { createReducer, on } from '@ngrx/store';
import { CVsStateInterface } from '@models/interfaces/cvs.state.interface';
import {
  getCVById,
  getCVByIdFail,
  getCVByIdSuccess,
  getCVsList,
  getCVsListFail,
  getCVsListSuccess
} from '@ourStore/cvs/cvs.actions';

const initialState: CVsStateInterface = {
  isLoading: false,
  cvsList: [],
  errors: null,
  cv: null,
}

export const cvsReducers = createReducer(
  initialState,
  on(
    getCVsList, (state): CVsStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCVsListSuccess, (state, { cvsList }): CVsStateInterface => ({
      ...state,
      isLoading: false,
      cvsList,
      errors: null,
    })
  ),
  on(
    getCVsListFail, (state, { errors }): CVsStateInterface => ({
      ...state,
      isLoading: false,
      errors,
    })
  ),
  on(
    getCVById, (state): CVsStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCVByIdSuccess, (state, { cv }): CVsStateInterface => ({
      ...state,
      cv,
      isLoading: false,
      errors: null,
    })
  ),
  on(
    getCVByIdFail, (state, { errors }): CVsStateInterface=> ({
      ...state,
      isLoading: false,
      errors,
    })
  ),
)
