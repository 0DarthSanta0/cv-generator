import { ListElement } from '../models/interfaces/list-element.interface';
import { MainModulesTitles } from './main-modules-titles';

export const MAIN_PAGE_ELEMENTS_LIST: ListElement[] = [
  {
    value: MainModulesTitles.EMPLOYEES_VALUE,
    label: MainModulesTitles.EMPLOYEES_LABEL,
  },
  {
    value: MainModulesTitles.PROJECTS_VALUE,
    label: MainModulesTitles.PROJECTS_LABEL,
  },
  {
    value: MainModulesTitles.CV_TEMPLATES_VALUE,
    label: MainModulesTitles.CV_TEMPLATES_LABEL,
  },
  {
    value: MainModulesTitles.ENTITIES_VALUE,
    label: MainModulesTitles.ENTITIES_LABEL,
  },
];

export const FIRST_SELECTED_ELEMENT: ListElement = {
  label: MainModulesTitles.EMPLOYEES_LABEL,
  value: MainModulesTitles.EMPLOYEES_VALUE,
}


