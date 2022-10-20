import { createAction, props } from '@ngrx/store';
import { BackendErrorsInterface } from '@models/backend-errors.interface';
import { ActionTypes } from '@ourStore/projects/enums/action-types';
import { ProjectsInterface } from '@models/interfaces/no-attributes-projects.interface';

export const getProjectsList = createAction(
  ActionTypes.GET_PROJECTS_LIST
)

export const getProjectsListSuccess = createAction(
  ActionTypes.GET_PROJECTS_LIST_SUCCESS,
  props<{ projectsList: ProjectsInterface[] }>()
)

export const getProjectsListFail = createAction(
  ActionTypes.GET_PROJECTS_LIST_FAIL,
  props<{ errors: BackendErrorsInterface }>()
)

export const getProjectById = createAction(
  ActionTypes.GET_PROJECT_BY_ID,
  props<{ id: number }>()
)

export const getProjectByIdSuccess = createAction(
  ActionTypes.GET_PROJECT_BY_ID_SUCCESS,
  props<{ project: ProjectsInterface }>()
)

export const getProjectByIdFail = createAction(
  ActionTypes.GET_PROJECT_BY_ID_FAIL,
  props<{ errors: BackendErrorsInterface }>()
)

export const updateProject = createAction(
  ActionTypes.POST_PROJECT,
  props<{ newProject: ProjectsInterface }>()
)

export const updateProjectSuccess = createAction(
  ActionTypes.POST_PROJECT_SUCCESS,
)

export const updateProjectFail = createAction(
  ActionTypes.POST_PROJECT_FAIL,
  props<{ errors: BackendErrorsInterface }>()
)


export const postProject = createAction(
  ActionTypes.POST_PROJECT,
  props<{ newProject: ProjectsInterface }>()
)

export const postProjectSuccess = createAction(
  ActionTypes.POST_PROJECT_SUCCESS,
)

export const postProjectFail = createAction(
  ActionTypes.POST_PROJECT_FAIL,
  props<{ errors: BackendErrorsInterface }>()
)
