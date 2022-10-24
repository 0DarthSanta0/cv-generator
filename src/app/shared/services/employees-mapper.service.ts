import { Injectable } from '@angular/core';
import { EmployeesResponseInterface } from '@ourStore/employees/models/employees-response.interface';
import { EmployeesInterface, IEmployeesWithSkills } from '@models/employees.interface';
import { SkillInterface } from '@models/skill.interface';
import { EmployeeInfoDtoInterface } from '@models/interfaces/employee-info-dto.interface';
import { LanguageInterface } from '@models/interfaces/language.interface';
import { IEmployeeFormDto } from '@employees';
import {
  JsonAttribute,
  JsonData,
  JsonDataWithAttributes,
  JsonResponse
} from '@models/interfaces/json-data-response.interface';
import { PositionInterface } from '@models/interfaces/position.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeesMapperService {

  public getEmployeesWithPositionMap(employees: EmployeesResponseInterface[]): EmployeesInterface[] {
    return employees.map((employee) => {
      const position = employee.position;
      const mappedEmployee = {
        ...employee,
        position: position.name
      }
      return mappedEmployee;
    });
  }

  public getEmployeesWithSkills(listEmployees: EmployeesInterface[], skills: SkillInterface[]): IEmployeesWithSkills[] {

    const skillsMap = this.nameMapper(skills);
    return listEmployees.reduce((acc: IEmployeesWithSkills[], employee: EmployeesInterface) => {

      const employeesWithSkills: IEmployeesWithSkills = {
        ...employee,
        employees: employee,
        skills: employee.skills.data.map(skill => skillsMap[skill.id]),
      }
      return [...acc, employeesWithSkills];
    }, []);
  }

  public responseMap(dataResponse: JsonResponse<JsonDataWithAttributes<JsonAttribute>[]>): { id: number, name: string }[] {
    return dataResponse.data
      .map((item: JsonDataWithAttributes<JsonAttribute>) => item)
      .reduce((acc, data: JsonDataWithAttributes<JsonAttribute>) => {
          const newObj: { id: number, name: string } = {
            id: data.id,
            name: data.attributes.name,
          }
          return [...acc, newObj];
        }
        , [] as { id: number, name: string }[]);
  }

  public getEmployeeDto(employee: EmployeesInterface, skills: SkillInterface[], languages: LanguageInterface[]): EmployeeInfoDtoInterface {

    console.log(languages)

    const emplSkillsWithLevelMap = this.levelMapper(employee.skills.data);
    const emplLanguagesWithLevelMap = this.levelMapper(employee.languages.data);

    const emplSkills = skills.filter((skill) => emplSkillsWithLevelMap[skill.id]);
    const emplLanguages = languages.filter((language) => emplLanguagesWithLevelMap[language.id]);

    const employeeDto: EmployeeInfoDtoInterface = {
      employee: employee,
      languages: emplLanguages.map((language) => {
        const mappedLanguage = {
          ...language,
          level: emplLanguagesWithLevelMap[language.id]
        }
        return mappedLanguage;
      }),
      skills: emplSkills.map((skill) => {
        const mappedSkill = {
          ...skill,
          level: emplSkillsWithLevelMap[skill.id]
        }
        return mappedSkill;
      })
    }
    return employeeDto;
  }

  public employeeDtoToEmployee(dto: IEmployeeFormDto, allSkills: SkillInterface[], allLanguages: LanguageInterface[], allPositions: PositionInterface[]): EmployeesInterface {

    const skillsObj = this.nameMapper(allSkills);
    const languagesObj = this.nameMapper(allLanguages);
    const positionsObj = this.nameMapper(allPositions);

    const skills: JsonResponse<JsonData[]> = {
      data: dto.skills.map((skill) => {
        return {
          id: +this.getKeyByValue(skillsObj, skill.skillName),
          level: skill.skillLevel
        }
      })
    }

    const languages: JsonResponse<JsonData[]> = {
      data: dto.languages.map((language) => {
        return {
          id: +this.getKeyByValue(languagesObj, language.languageName),
          level: language.languageLevel
        }
      })
    }

    const newEmployee: EmployeesInterface = {
      ...dto,
      skills: skills,
      languages: languages,
      position: this.getKeyByValue(positionsObj, dto.position)
    }

    return newEmployee;
  }

  private nameMapper<T extends { id: number, name: string }>(data: T[]): { [id: number]: string } {
    const dataMap = data.reduce((acc, current) => ({
      ...acc,
      [current.id]: current.name
    }), {});
    return dataMap;
  }

  private levelMapper<T extends { id: number, level: number }>(data: T[]): { [id: number]: number } {
    const dataMap = data.reduce((acc, current) => ({
      ...acc,
      [current.id]: current.level
    }), {});

    return dataMap;
  }

  private getKeyByValue(obj: any, value: any): string {
    const key = Object.keys(obj).find(key => obj[key] === value);
    if (key) {
      return key;
    }
    return '';
  }
}
