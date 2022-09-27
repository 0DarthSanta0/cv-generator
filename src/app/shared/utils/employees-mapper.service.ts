import { Injectable } from '@angular/core';
import { EmployeesResponseInterface } from '../../store/employees/models/employees-response.interface';
import { EmployeesInterface } from '../models/employees.interface';
import { SkillsListResponseInterface } from '../../store/employees/models/skills-list-response.interface';
import { SkillInterface } from '../models/skill.interface';

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
