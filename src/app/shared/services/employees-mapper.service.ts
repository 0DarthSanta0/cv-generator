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
  JsonEmployeeCv,
  JsonProject,
  JsonResponse
} from '@models/interfaces/json-data-response.interface';
import { PositionInterface } from '@models/interfaces/position.interface';
import { EmployeeCvDtoInterface } from '@models/interfaces/employee-cv-dto.interface';
import { ProjectsInterface } from '@models/interfaces/no-attributes-projects.interface';
import { IResponsibility } from '@models/interfaces/responsibility.interface';

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
      cvs: {data: []},
      position: this.getKeyByValue(positionsObj, dto.position),
    }

    return newEmployee;
  }

  public getCvsListFormEmployee(employee: EmployeeInfoDtoInterface): JsonEmployeeCv[] {
    return employee.employee.cvs.data;
  }

  public getEmployeeCvDto(cvId: number, employee: EmployeeInfoDtoInterface, languages: LanguageInterface[],
                          skills: SkillInterface[], projects: ProjectsInterface[],
                          responsibilities: IResponsibility[]
  ): EmployeeCvDtoInterface {
    const cv: JsonEmployeeCv[] = employee.employee.cvs.data.filter((cvs) => cvs.id === cvId);

    const emplCvSkillsWithLevelMap = this.levelMapper(cv[0].skills);
    const emplCvLanguagesWithLevelMap = this.levelMapper(cv[0].languages);
    const responsibilitiesObj = this.nameMapper(responsibilities);
    const projectsObj = this.responsibilityMapper(cv[0].projects);

    const emplCvSkills = skills.filter((skill) => emplCvSkillsWithLevelMap[skill.id]);
    const emplCvLanguages = languages.filter((language) => emplCvLanguagesWithLevelMap[language.id]);
    const emplCvProjects = projects.filter((project) => projectsObj[project.id]);

    const mappedProjectWithResponsibilities = cv[0].projects.reduce((respNamesMap, curr) => {
      const responsibilities = curr.responsibilities.map((responsibility) => responsibilitiesObj[responsibility]).filter((responsibilityName) => !!responsibilityName)
      respNamesMap[curr.id] = responsibilities;
      return respNamesMap;
    }, {} as { [id: number]: string[] })

    console.log(cv)

    const mappedCv: EmployeeCvDtoInterface = {
      ...cv[0],
      languages: emplCvLanguages.map((language) => {
        const mappedLanguage = {
          ...language,
          level: emplCvLanguagesWithLevelMap[language.id]
        }
        return mappedLanguage;
      }),
      skills: emplCvSkills.map((skill) => {
        const mappedSkill = {
          ...skill,
          level: emplCvSkillsWithLevelMap[skill.id]
        }
        return mappedSkill;
      }),
      projects: emplCvProjects.map((project) => {
        const mappedProject = {
          ...project,
          responsibilities: mappedProjectWithResponsibilities[project.id]
        }
        return mappedProject;
      }),
    }

    return mappedCv;
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

  private responsibilityMapper<T extends JsonProject>(data: T[]): { [p: number]: string } {
    const dataMap = data.reduce((acc, current) => ({
      ...acc,
      [current.id]: current.responsibilities
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
