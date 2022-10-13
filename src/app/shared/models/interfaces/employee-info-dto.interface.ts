import { EmployeesInterface } from '../employees.interface';
import { SkillInterface } from '../skill.interface';
import { LanguageInterface } from './language.interface';

export interface EmployeeInfoDtoInterface {
    employee: EmployeesInterface,
    skills: SkillInterface[],
    languages: LanguageInterface[]
}