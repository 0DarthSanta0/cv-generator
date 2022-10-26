import { SkillInterface } from '@models/skill.interface';
import { LanguageInterface } from '@models/interfaces/language.interface';
import { ProjectsInterface } from '@models/interfaces/no-attributes-projects.interface';

export interface EmployeeCvDtoInterface {
    id: number,
    nameCv: string,
    firstName: string,
    lastName: string,
    education: string,
    position:string,
    description: string,
    skills: SkillInterface[],
    languages: LanguageInterface[]
    projects: ProjectsInterface[],
}