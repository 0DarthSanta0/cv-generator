import { IMainState } from '@ourStore/main/models/main-state.interface';
import { createReducer, on } from '@ngrx/store';

import { EmployeesStateInterface } from '@ourStore/employees/models/employees-state.interface';
import {
  languagesList,
  languagesListFailure,
  languagesListSuccess,
  responsibilitiesList,
  responsibilitiesListFailure,
  responsibilitiesListSuccess,
  skillsList,
  skillsListFailure,
  skillsListSuccess
} from '@ourStore/main/main-actions';

const initialState: IMainState = {
  isLoading: false,
  skillsList: [],
  languagesList: [],
  responsibilitiesList: [],
  errors: null,
}

export const mainReducer = createReducer(
  initialState,
  on(
    skillsList,languagesList,responsibilitiesList, (state): IMainState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    skillsListSuccess, (state, action): IMainState => ({
      ...state,
      isLoading: false,
      skillsList: action.listSkills,
      errors: null,
    })
  ),
  on(
    languagesListSuccess, (state, action): IMainState => ({
      ...state,
      isLoading: false,
      languagesList: action.listLanguages,
      errors: null,
    })
  ),
  on(
    responsibilitiesListSuccess, (state, action): IMainState => ({
      ...state,
      isLoading: false,
      responsibilitiesList: action.listResponsibilities,
      errors: null,
    })
  ),
  on(
    languagesListFailure,skillsListFailure,responsibilitiesListFailure, (state, action): IMainState => ({
      ...state,
      isLoading: false,
      errors: action.errors,
    })
  ),
)