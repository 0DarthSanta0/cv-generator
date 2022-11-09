import { ListElement } from '../models/interfaces/list-element.interface';
import { MainModulesTitles } from './main-modules-titles';
import { CV_TEMPLATES, EMPLOYEES, ENTITIES, PROJECTS } from '@constants/breadcrumbs';

export const MAIN_PAGE_ELEMENTS_LIST: ListElement[] = [
  {
    value: MainModulesTitles.EMPLOYEES_VALUE,
    label: EMPLOYEES,
  },
  {
    value: MainModulesTitles.PROJECTS_VALUE,
    label: PROJECTS,
  },
  {
    value: MainModulesTitles.CV_TEMPLATES_VALUE,
    label: CV_TEMPLATES,
  },
  {
    value: MainModulesTitles.ENTITIES_VALUE,
    label: ENTITIES,
  },
];

export const FIRST_SELECTED_ELEMENT: ListElement = {
  label: EMPLOYEES,
  value: MainModulesTitles.EMPLOYEES_VALUE,
}


