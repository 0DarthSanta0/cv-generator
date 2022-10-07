import { BackendErrorsInterface } from '@models/backend-errors.interface';
import { IEmployeesWithSkills } from '@models/employees.interface';
import { SkillInterface } from '@models/skill.interface';
import { LanguageInterface } from '@models/interfaces/language.interface';
import { EmployeeInfoDtoInterface } from '@models/interfaces/employee-info-dto.interface';
import { PositionInterface } from '@models/interfaces/position.interface';

export interface EmployeesStateInterface {
    isLoading: boolean,
    employeesList: IEmployeesWithSkills[],
    skillsList: SkillInterface[],
    languagesList: LanguageInterface[],
    positionsList: PositionInterface[],
    employeeDTO: EmployeeInfoDtoInterface | null,
    errors: BackendErrorsInterface | null,
}