import { createAction, props } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { ActionTypes } from './enums/action-types';

export const setBreadcrumbs = createAction(ActionTypes.SET_BREADCRUMBS, props<{breadcrumbs: MenuItem[]}>());
