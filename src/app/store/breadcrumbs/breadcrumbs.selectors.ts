import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BreadcrumbsState } from '../../shared/models/interfaces/breadcrumbs.state.interface';
import { MenuItem } from 'primeng/api';

export const breadcrumbsFeatureSelector = createFeatureSelector<BreadcrumbsState>('breadcrumbs');

export const selectBreadcrumbs = createSelector(
  breadcrumbsFeatureSelector,
  (state: BreadcrumbsState) : MenuItem[] => state.breadcrumbs
);
