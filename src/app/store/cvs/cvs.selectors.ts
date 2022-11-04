import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CVsStateInterface } from '@models/interfaces/cvs.state.interface';

export const cvsFeatureSelector = createFeatureSelector<CVsStateInterface>('cvs');

export const isLoadingCVSelector = createSelector(
  cvsFeatureSelector,
  (state: CVsStateInterface) => state.isLoading
);

export const cvsListSelector = createSelector(
  cvsFeatureSelector,
  (state: CVsStateInterface) => state.cvsList
);

export const errorsSelector = createSelector(
  cvsFeatureSelector,
  (state: CVsStateInterface) => state.errors
);

export const cvSelector = createSelector(
  cvsFeatureSelector,
  (state: CVsStateInterface) => state.cv
);
