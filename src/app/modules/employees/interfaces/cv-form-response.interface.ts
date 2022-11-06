import { ILanguageFormResponse, ISkillFormResponse } from '@employees';
import { IProjectFormResponse } from './project-form-response.interface';

export interface ICvFormResponse {
  id: number,
  nameCv: string,
  firstName: string,
  lastName: string,
  descriptionCv: string,
  education: string,
  position: string,
  languages: ILanguageFormResponse[],
  skills: ISkillFormResponse[],
  projects: IProjectFormResponse[]
}