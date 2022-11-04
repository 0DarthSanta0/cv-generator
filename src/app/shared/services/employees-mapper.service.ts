import { Injectable } from '@angular/core';
import { EmployeesResponseInterface } from '@ourStore/employees/models/employees-response.interface';
import { EmployeesInterface, IEmployeesWithSkills } from '@models/employees.interface';
import { SkillInterface } from '@models/skill.interface';
import { EmployeeInfoDtoInterface } from '@models/interfaces/employee-info-dto.interface';
import { LanguageInterface } from '@models/interfaces/language.interface';
import { ICvFormResponse, IEmployeeFormDto } from '@employees';
import {
  JsonAttribute,
  JsonData,
  JsonDataWithAttributes,
  JsonEmployeeCv,
  JsonProject, JsonProjectCv,
  JsonResponse
} from '@models/interfaces/json-data-response.interface';
import { PositionInterface } from '@models/interfaces/position.interface';
import { EmployeeCvDtoInterface } from '@models/interfaces/employee-cv-dto.interface';
import { IResponsibility } from '@models/interfaces/responsibility.interface';
import { CVsInterface } from '@services/fake-cvs.service';
import { ProjectsInterface } from '@models/interfaces/no-attributes-projects.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeesMapperService {

  public getEmployeesWithPositionMap(employees: EmployeesResponseInterface[]): EmployeesInterface[] {
    return employees.map((employee) => {
      const position = employee.position;

      if (employee.skills && employee.cvs && employee.languages) {
        const mappedEmployee: EmployeesInterface = {
          ...employee,
          position: position.name
        }
        return mappedEmployee;
      } else {
        const mappedEmployee: EmployeesInterface = {
          ...employee,
          skills: {
            data: []
          },
          languages: {
            data: []
          },
          cvs: {
            data: []
          },
          position: position.name
        }
        return mappedEmployee;
      }

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

    if (!employee.cvs && !employee.skills && !employee.languages) {
      employee.skills = {
        data: [],
      }
      employee.languages = {
        data: [],
      }
      employee.cvs = {
        data: [],
      }
    }

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
    if (employee.employee.cvs) {
      return employee.employee.cvs.data;
    }
    return [];
  }

  public getEmployeeCvDto(cvId: number, employee: EmployeeInfoDtoInterface, languages: LanguageInterface[],
                          skills: SkillInterface[]
  ): EmployeeCvDtoInterface {
    const cv: JsonEmployeeCv[] = employee.employee.cvs.data.filter((cvs) => cvs.id === cvId);

    const emplCvSkillsWithLevelMap = this.levelMapper(cv[0].skills);
    const emplCvLanguagesWithLevelMap = this.levelMapper(cv[0].languages);

    const emplCvSkills = skills.filter((skill) => emplCvSkillsWithLevelMap[skill.id]);
    const emplCvLanguages = languages.filter((language) => emplCvLanguagesWithLevelMap[language.id]);

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

    }

    console.log(mappedCv.projects)
    return mappedCv;
  }

  public updateCv(newCv: ICvFormResponse, cvs: JsonEmployeeCv[], allLanguages: LanguageInterface[],
                  allSkills: SkillInterface[], responsibilities: IResponsibility[], currentEmployeeId: number): { jsonCvs: JsonEmployeeCv[], employeeId: number } {
    const skillsObj = this.nameMapper(allSkills);
    const languagesObj = this.nameMapper(allLanguages);

    const skills = newCv.skills.reduce((acc: JsonData[], curr) => {
      const obj: JsonData = {
        id: +this.getKeyByValue(skillsObj, curr.skillName),
        level: curr.skillLevel
      }
      acc.push(obj)
      return acc;
    }, []);

    const languages = newCv.languages.reduce((acc: JsonData[], curr) => {
      const obj: JsonData = {
        id: +this.getKeyByValue(languagesObj, curr.languageName),
        level: curr.languageLevel
      }
      acc.push(obj)
      return acc;
    }, []);

    const updatedCv: JsonEmployeeCv = {
      ...newCv,
      skills: skills,
      languages: languages,

    };

    const cvsResult: JsonEmployeeCv[] = cvs.map((cv) => {
      if (cv.id === updatedCv.id) {
        cv = updatedCv;
      }
      return cv;
    })

    const res: { jsonCvs: JsonEmployeeCv[], employeeId: number } = {
      jsonCvs: cvsResult,
      employeeId: currentEmployeeId
    }

    return res;
  }

  public setCvTemplateToEmployeeCvs(cvTemplate: CVsInterface, employeeCvs: JsonEmployeeCv[],
                                    currEmployee: EmployeesInterface, projects: ProjectsInterface[]): { cvsList: JsonEmployeeCv[], employeeId: number } {

    console.log(cvTemplate)

    const projectsObj = this.responsibilityMapper(cvTemplate.projects.data);
    const emplCvProjects: ProjectsInterface[] = projects.filter((project) => projectsObj[project.id]);

    console.log(emplCvProjects)

    const cvsProjects: JsonProjectCv[] = emplCvProjects.reduce((acc:JsonProjectCv[], curr) => {

      const project: JsonProjectCv = {
        ...curr,
        skills: curr.skills.data.map((skill) => skill.attributes.name)
      }

      return [...acc, project];
    }, [])

    const cvTemplateMapped: JsonEmployeeCv = {
      id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
      firstName: currEmployee.firstName,
      lastName: currEmployee.lastName,
      education: currEmployee.education,
      position: '',
      nameCv: cvTemplate.name,
      descriptionCv: cvTemplate.description,
      skills: cvTemplate.skills.data.ids.reduce((acc: JsonData[], curr) => {
        const obj: JsonData = {
          id: curr,
          level: 1
        }
        return [...acc, obj];
      }, []),
      languages: cvTemplate.languages.data.ids.reduce((acc: JsonData[], curr) => {
        const obj: JsonData = {
          id: curr,
          level: 1
        }
        return [...acc, obj];
      }, []),
      projects: cvsProjects
    }

    console.log(cvTemplateMapped)

    const res: { cvsList: JsonEmployeeCv[], employeeId: number } = {
      cvsList: [...employeeCvs, cvTemplateMapped],
      employeeId: currEmployee.id
    }

    return res;
  }

  public filteredEmployeeCvs(cvId: number, employee: EmployeeInfoDtoInterface): { jsonCvs: JsonEmployeeCv[], employeeId: number } {

    const filteredCvsList = employee.employee.cvs.data.filter((cv) => cv.id !== cvId)

    const res: { jsonCvs: JsonEmployeeCv[], employeeId: number } = {
      jsonCvs: filteredCvsList,
      employeeId: employee.employee.id
    }
    console.log(res)
    return res;
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

  private projectMapper(data: ProjectsInterface[]): { [id: number]: ProjectsInterface } {
    const dataMap = data.reduce((acc, current) => ({
      ...acc,
      [current.id]: current
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
