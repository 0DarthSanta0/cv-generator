import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BreadcrumbsState } from '../../shared/models/interfaces/breadcrumbs.state.interface';
import { MenuItem } from 'primeng/api';

export const selectBreadcrumbs = createSelector(createFeatureSelector('main'), (state: BreadcrumbsState) : MenuItem[] => state.breadcrumbs);
