import { ILanguageFormResponse, ISkillFormResponse } from '@employees';
import { ProjectInfoForm } from '@models/interfaces/project-info-form.interface';

export interface ICvFormResponse {
  id: number,
  firstName: string,
  lastName: string,
  descriptionCv: string,
  education: string,
  nameCv: string,
  languages: ILanguageFormResponse[],
  skills: ISkillFormResponse[],
  projects: ProjectInfoForm[]
}