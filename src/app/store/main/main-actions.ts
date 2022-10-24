import { createAction, props } from '@ngrx/store';
import { SkillInterface } from '@models/skill.interface';
import { BackendErrorsInterface } from '@models/backend-errors.interface';
import { LanguageInterface } from '@models/interfaces/language.interface';
import { MainActionsTypes } from '@ourStore/main/main-actions-types';
import { IResponsibility } from '@models/interfaces/responsibility.interface';

export const skillsList = createAction(
  MainActionsTypes.SKILLS_LIST
)

export const skillsListSuccess = createAction(
  MainActionsTypes.SKILLS_LIST_SUCCESS,
  props<{ listSkills: SkillInterface[] }>()
)

export const skillsListFailure = createAction(
  MainActionsTypes.SKILLS_LIST_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)

export const languagesList = createAction(
  MainActionsTypes.LANGUAGES_LIST
)

export const languagesListSuccess = createAction(
  MainActionsTypes.LANGUAGES_LIST_SUCCESS,
  props<{ listLanguages: LanguageInterface[] }>()
)

export const languagesListFailure = createAction(
  MainActionsTypes.LANGUAGES_LIST_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)

export const responsibilitiesList = createAction(
  MainActionsTypes.RESPONSIBILITIES_LIST
)

export const responsibilitiesListSuccess = createAction(
  MainActionsTypes.RESPONSIBILITIES_LIST_SUCCESS,
  props<{ listResponsibilities: IResponsibility[] }>()
)

export const responsibilitiesListFailure = createAction(
  MainActionsTypes.RESPONSIBILITIES_LIST_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)