import { createReducer, on } from '@ngrx/store';
import {
  getProjectById, getProjectByIdFail, getProjectByIdSuccess,
  getProjectsList,
  getProjectsListFail,
  getProjectsListSuccess
} from '@ourStore/projects/projects.actions';
import { ProjectsStateInterface } from '@models/interfaces/projects.state.interface';

const initialState: ProjectsStateInterface = {
  isLoading: false,
  projectsList: [],
  errors: null,
  project: null,
}

export const projectsReducers = createReducer(
  initialState,
  on(
    getProjectsList, (state): ProjectsStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getProjectsListSuccess, (state, { projectsList }): ProjectsStateInterface => ({
      ...state,
      isLoading: false,
      projectsList,
      errors: null,
    })
  ),
  on(
    getProjectsListFail, (state, { errors }): ProjectsStateInterface => ({
      ...state,
      isLoading: false,
      errors,
    })
  ),
  on(
    getProjectById, (state): ProjectsStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getProjectByIdSuccess, (state, { project }): ProjectsStateInterface => ({
      ...state,
      project,
      isLoading: false,
      errors: null,
    })
  ),
  on(
    getProjectByIdFail, (state, { errors }): ProjectsStateInterface=> ({
      ...state,
      isLoading: false,
      errors,
    })
  ),
)
