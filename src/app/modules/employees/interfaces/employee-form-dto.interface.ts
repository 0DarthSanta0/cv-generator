import { ISkillFormResponse } from './skill-form.interface';
import { ILanguageFormResponse } from './language-form.interface';

export interface IEmployeeFormDto {
    id: number,
    username: string,
    firstName: string,
    lastName: string
    email: string,
    education: string,
    description: string,
    position: string | number,
    skills: ISkillFormResponse[],
    languages: ILanguageFormResponse[]
}