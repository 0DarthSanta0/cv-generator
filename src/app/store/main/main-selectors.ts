import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMainState } from '@ourStore/main/models/main-state.interface';

export const mainFeatureSelector = createFeatureSelector<IMainState>('main');

export const selectSkills = createSelector(
  mainFeatureSelector,
  (mainState: IMainState) => mainState.skillsList
);

export const selectLanguages = createSelector(
  mainFeatureSelector,
  (mainState: IMainState) => mainState.languagesList
);

export const selectResponsibilities = createSelector(
  mainFeatureSelector,
  (mainState: IMainState) => mainState.responsibilitiesList
);