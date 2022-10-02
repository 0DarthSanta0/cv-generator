import {BackendErrorsInterface} from "../../../shared/models/backend-errors.interface";
import { EmployeesInterface, IEmployeesWithSkills } from '../../../shared/models/employees.interface';
import { SkillInterface } from '../../../shared/models/skill.interface';
import { LanguageInterface } from '@models/interfaces/language.interface';
import { EmployeeInfoDtoInterface } from '@models/interfaces/employee-info-dto.interface';

export interface EmployeesStateInterface {
  isLoading: boolean,
  employeesList: IEmployeesWithSkills[],
  skillsList: SkillInterface[],
  languagesList: LanguageInterface[],
  employeeDTO: EmployeeInfoDtoInterface | null,
  errors: BackendErrorsInterface | null,
  isSubmittingEmplInfo: boolean;
}