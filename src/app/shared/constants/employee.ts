export const COLUMN_TABLE_NAMES: { [key: string]: string } = {
  'firstName': 'emplInfo.infoContent.firstName',
  'lastName': 'emplInfo.infoContent.lastName', 'email': 'emplInfo.infoContent.email',
  'position': 'emplInfo.infoContent.position', 'skills': 'emplInfo.skills'
};

export const EMPL_INFO_INPUT: string[] = ['firstName', 'lastName', 'username', 'email'];
export const EMPL_INFO_TEXTAREA: string[] = ['education', 'description'];
export const SELECTED_INFO_COMPONENT: string = 'info';
export const SELECTED_CV_COMPONENT: string = 'cv';
export const BUTTON_LABEL: string = 'cvsInfo.buttons.preview';
export const EMPL_CV_INPUT: string[] = ['nameCv', 'firstName', 'lastName', 'position'];
export const EMPL_CV_PROJECTS_INPUT: string[] = ['name', 'domain', 'internalName'];
export const EMPL_CV_PROJECTS_AUTOCOMPLETE: string[] = ['skills', 'responsibilities'];