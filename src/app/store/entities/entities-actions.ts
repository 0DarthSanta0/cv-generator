import { createAction, props } from '@ngrx/store';
import { BackendErrorsInterface } from '@models/backend-errors.interface';
import { EntitiesActionsTypes } from '@ourStore/entities/entities-actions-types';
import { SkillInterface } from '@models/skill.interface';
import { LanguageInterface } from '@models/interfaces/language.interface';
import { IResponsibility } from '@models/interfaces/responsibility.interface';

export const deleteResponsibility = createAction(
  EntitiesActionsTypes.DELETE_RESPONSIBILITY,
  props<{ id: number }>()
)

export const deleteResponsibilitySuccess = createAction(
  EntitiesActionsTypes.DELETE_RESPONSIBILITY_SUCCESS,
)

export const deleteResponsibilityFailure = createAction(
  EntitiesActionsTypes.DELETE_RESPONSIBILITY_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)

export const deleteSkill = createAction(
  EntitiesActionsTypes.DELETE_SKILL,
  props<{ id: number }>()
)

export const deleteSkillSuccess = createAction(
  EntitiesActionsTypes.DELETE_SKILL_SUCCESS,
)

export const deleteSkillFailure = createAction(
  EntitiesActionsTypes.DELETE_SKILL_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)

export const deleteLanguage = createAction(
  EntitiesActionsTypes.DELETE_LANGUAGE,
  props<{ id: number }>()
)

export const deleteLanguageSuccess = createAction(
  EntitiesActionsTypes.DELETE_LANGUAGE_SUCCESS,
)

export const deleteLanguageFailure = createAction(
  EntitiesActionsTypes.DELETE_LANGUAGE_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)

export const addResponsibility = createAction(
  EntitiesActionsTypes.ADD_RESPONSIBILITY,
  props<{ name: string }>()
)

export const addResponsibilitySuccess = createAction(
  EntitiesActionsTypes.ADD_RESPONSIBILITY_SUCCESS,
)

export const addResponsibilityFailure = createAction(
  EntitiesActionsTypes.ADD_RESPONSIBILITY_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)

export const addLanguage = createAction(
  EntitiesActionsTypes.ADD_LANGUAGE,
  props<{ name: string }>()
)

export const addLanguageSuccess = createAction(
  EntitiesActionsTypes.ADD_LANGUAGE_SUCCESS,
)

export const addLanguageFailure = createAction(
  EntitiesActionsTypes.ADD_LANGUAGE_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)

export const addSkill = createAction(
  EntitiesActionsTypes.ADD_SKILL,
  props<{ name: string }>()
)

export const addSkillSuccess = createAction(
  EntitiesActionsTypes.ADD_SKILL_SUCCESS,
)

export const addSkillFailure = createAction(
  EntitiesActionsTypes.ADD_SKILL_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)

export const updateSkill = createAction(
  EntitiesActionsTypes.UPDATE_SKILL,
  props<{ id: number, name: string }>()
)

export const updateSkillSuccess = createAction(
  EntitiesActionsTypes.UPDATE_SKILL_SUCCESS,
)

export const updateSkillFailure = createAction(
  EntitiesActionsTypes.UPDATE_SKILL_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)

export const updateLanguage = createAction(
  EntitiesActionsTypes.UPDATE_LANGUAGE,
  props<{ id: number, name: string }>()
)

export const updateLanguageSuccess = createAction(
  EntitiesActionsTypes.UPDATE_LANGUAGE_SUCCESS,
)

export const updateLanguageFailure = createAction(
  EntitiesActionsTypes.UPDATE_LANGUAGE_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)

export const updateResponsibility = createAction(
  EntitiesActionsTypes.UPDATE_RESPONSIBILITY,
  props<{ id: number, name: string }>()
)

export const updateResponsibilitySuccess = createAction(
  EntitiesActionsTypes.UPDATE_RESPONSIBILITY_SUCCESS,
)

export const updateResponsibilityFailure = createAction(
  EntitiesActionsTypes.UPDATE_RESPONSIBILITY_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)