import { createAction, props } from '@ngrx/store';
import { MenuItem } from 'primeng/api';

export const setBreadcrumbs = createAction('[Store] set breadcrumbs', props<{breadcrumbs: MenuItem[]}>());
