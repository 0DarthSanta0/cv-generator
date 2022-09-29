import { Injectable } from '@angular/core';
import { EmployeesResponseInterface } from '@ourStore/employees/models/employees-response.interface';
import { EmployeesInterface, IEmployeesWithSkills } from '@models/employees.interface';
import { SkillsListResponseInterface } from '@ourStore/employees/models/skills-list-response.interface';
import { SkillInterface } from '@models/skill.interface';

@Injectable({
    providedIn: 'root'
})
export class EmployeesMapperService {

    public employeesWithPositionMap(employees: EmployeesResponseInterface[]): EmployeesInterface[] {
        return employees.map((employee) => {
            const position = employee.position;
            const mappedEmployee = {
                ...employee,
                position: position.name
            }
            return mappedEmployee;
        });
    }

    public employeeWithSkills(listEmployees: EmployeesInterface[], skills: SkillInterface[]): IEmployeesWithSkills[] {

        const skillsMap = skills.reduce((acc, skill) => ({
            ...acc,
            [skill.id]:skill.name
        }),{} as {[id: number]: string});

        return  listEmployees.reduce((acc: IEmployeesWithSkills[], employee: EmployeesInterface) => {

            const employeesWithSkills: IEmployeesWithSkills = {
                ...employee,
                employees: employee,
                skills: employee.skills.data.map(skill => skillsMap[skill.id]),
            }
            return [...acc, employeesWithSkills];
        }, [])
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
}
