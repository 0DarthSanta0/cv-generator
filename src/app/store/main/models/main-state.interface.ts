import { SkillInterface } from '@models/skill.interface';
import { LanguageInterface } from '@models/interfaces/language.interface';
import { IResponsibility } from '@models/interfaces/responsibility.interface';
import { BackendErrorsInterface } from '@models/backend-errors.interface';

export interface IMainState {
  isLoading: boolean,
  skillsList: SkillInterface[],
  languagesList: LanguageInterface[],
  responsibilitiesList: IResponsibility[],
  errors: BackendErrorsInterface | null,
}