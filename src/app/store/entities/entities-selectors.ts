import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IEntitiesState } from '@ourStore/entities/models/entities-state.interface';

export const entitiesFeatureSelector = createFeatureSelector<IEntitiesState>('entities');

export const selectLoadingEntities = createSelector(
  entitiesFeatureSelector,
  (mainState: IEntitiesState) => mainState.isLoading
);

export const selectErrorsEntities = createSelector(
  entitiesFeatureSelector,
  (mainState: IEntitiesState) => mainState.errors
);