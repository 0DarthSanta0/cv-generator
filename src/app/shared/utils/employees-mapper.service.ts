import { Injectable } from '@angular/core';
import { EmployeesResponseInterface } from '@ourStore/employees/models/employees-response.interface';
import { EmployeesInterface, IEmployeesWithSkills } from '@models/employees.interface';
import { SkillsListResponseInterface } from '@ourStore/employees/models/skills-list-response.interface';
import { SkillInterface } from '@models/skill.interface';
import { EmployeeInfoDtoInterface } from '@models/interfaces/employee-info-dto.interface';
import { LanguageInterface } from '@models/interfaces/language.interface';

@Injectable({
    providedIn: 'root'
})
export class EmployeesMapperService {

    private static nameMapper<T extends { id: number, name: string }>(data: T[]): { [id: number]: string } {
        const dataMap = data.reduce((acc, current) => ({
            ...acc,
            [current.id]: current.name
        }), {});

        return dataMap;
    }

    private static levelMapper<T extends { id: number, level: number }>(data: T[]): { [id: number]: number } {
        const dataMap = data.reduce((acc, current) => ({
            ...acc,
            [current.id]: current.level
        }), {});

        return dataMap;
    }

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
        const skillsMap = EmployeesMapperService.nameMapper(skills);

        return listEmployees.reduce((acc: IEmployeesWithSkills[], employee: EmployeesInterface) => {

            const employeesWithSkills: IEmployeesWithSkills = {
                ...employee,
                employees: employee,
                skills: employee.skills.data.map(skill => skillsMap[skill.id]),
            }
            return [...acc, employeesWithSkills];
        }, []);
    }

    public skillsMap(skillResponse: SkillsListResponseInterface): SkillInterface[] {
        return skillResponse.data.map((item) => item).reduce((acc: SkillInterface[], skill) => (
            [...acc,
                {
                    id: skill.id,
                    name: skill.attributes.name
                }
            ]
        ), []);
    }

    public getEmployeeDTO(employee: EmployeesInterface, skills: SkillInterface[], languages: LanguageInterface[]): EmployeeInfoDtoInterface {

        const emplSkillsWithLevelMap = EmployeesMapperService.levelMapper(employee.skills.data);
        const emplLanguagesWithLevelMap = EmployeesMapperService.levelMapper(employee.languages.data);

        const emplSkills = skills.filter((skill) => emplSkillsWithLevelMap[skill.id]);
        const emplLanguages = languages.filter((language) => emplLanguagesWithLevelMap[language.id]);

        const employeeDTO: EmployeeInfoDtoInterface = {
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
        return employeeDTO;
    }
}
