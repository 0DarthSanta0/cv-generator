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
        return  listEmployees.reduce((acc: IEmployeesWithSkills[], employee: EmployeesInterface) => {
            const employeesSkills = employee.skills.data.map((dataSkill) =>
                (skills.find((skill) => skill.id === dataSkill.id))
            );

            const employeesWithSkills: IEmployeesWithSkills = {
                ...employee,
                employees: employee,
                skills: employeesSkills.map((skill) => skill!.name),
            }
            console.log(employeesWithSkills)
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
