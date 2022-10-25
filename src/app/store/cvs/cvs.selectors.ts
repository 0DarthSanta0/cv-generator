import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CVsStateInterface } from '@models/interfaces/cvs.state.interface';

export const cvsFeatureSelector = createFeatureSelector<CVsStateInterface>('CVs');

export const isLoadingProjectSelector = createSelector(
  cvsFeatureSelector,
  (state: CVsStateInterface) => state.isLoading
);

export const projectsListSelector = createSelector(
  cvsFeatureSelector,
  (state: CVsStateInterface) => state.cvsList
);

export const errorsSelector = createSelector(
  cvsFeatureSelector,
  (state: CVsStateInterface) => state.errors
);

export const projectSelector = createSelector(
  cvsFeatureSelector,
  (state: CVsStateInterface) => state.cv
);
