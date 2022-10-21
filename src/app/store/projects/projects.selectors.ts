import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectsStateInterface } from '@models/interfaces/projects.state.interface';

export const projectsFeatureSelector = createFeatureSelector<ProjectsStateInterface>('projects');

export const isLoadingProjectSelector = createSelector(
  projectsFeatureSelector,
  (state: ProjectsStateInterface) => state.isLoading
);

export const projectsListSelector = createSelector(
  projectsFeatureSelector,
  (state: ProjectsStateInterface) => state.projectsList
);

export const errorsSelector = createSelector(
  projectsFeatureSelector,
  (state: ProjectsStateInterface) => state.errors
);

export const projectSelector = createSelector(
  projectsFeatureSelector,
  (state: ProjectsStateInterface) => state.project
);
