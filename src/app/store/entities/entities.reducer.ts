import { IMainState } from '@ourStore/main/models/main-state.interface';
import { createReducer, on } from '@ngrx/store';
import {
  addLanguage,
  addLanguageFailure,
  addLanguageSuccess,
  addResponsibility,
  addResponsibilityFailure,
  addResponsibilitySuccess,
  addSkill,
  addSkillFailure,
  addSkillSuccess,
  deleteLanguage,
  deleteLanguageFailure,
  deleteLanguageSuccess,
  deleteResponsibility,
  deleteResponsibilityFailure,
  deleteResponsibilitySuccess,
  deleteSkill,
  deleteSkillFailure,
  deleteSkillSuccess
} from '@ourStore/entities/entities-actions';
import { IEntitiesState } from '@ourStore/entities/models/entities-state.interface';

const initialState: IEntitiesState = {
  isLoading: false,
  errors: null,
}

export const entitiesReducer = createReducer(
  initialState,
  on(
    deleteSkill,
    deleteLanguage,
    deleteResponsibility,
    addSkill,
    addLanguage,
    addResponsibility,
    (state): IEntitiesState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    deleteResponsibilitySuccess,
    deleteSkillSuccess,
    deleteLanguageSuccess,
    addSkillSuccess,
    addLanguageSuccess,
    addResponsibilitySuccess,
    (state, action): IEntitiesState => ({
      ...state,
      isLoading: false,
      errors: null,
    })
  ),
  on(
    deleteSkillFailure,
    deleteResponsibilityFailure,
    deleteLanguageFailure,
    addSkillFailure,
    addLanguageFailure,
    addResponsibilityFailure,
    (state, action): IEntitiesState => ({
      ...state,
      isLoading: false,
      errors: action.errors,
    })
  ),
)