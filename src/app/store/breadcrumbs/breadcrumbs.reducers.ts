import { createReducer, on } from '@ngrx/store';
import { BreadcrumbsState } from '../../shared/models/interfaces/breadcrumbs.state.interface';
import { setBreadcrumbs } from './breadcrumbs.actions';

export const breadcrumbsInitialState: BreadcrumbsState = {
  breadcrumbs: [],
}

export const breadcrumbsReducer = createReducer(
  breadcrumbsInitialState,
  on(setBreadcrumbs, (state: BreadcrumbsState, {breadcrumbs}) =>
    {
      console.log(breadcrumbs)
      return { ...state,
      breadcrumbs, }
    }
  ),
)
