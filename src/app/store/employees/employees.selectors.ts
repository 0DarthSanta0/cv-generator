import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeesStateInterface } from './models/employees-state.interface';
import { EmployeesInterface, IEmployeesWithSkills } from '../../shared/models/employees.interface';
import { SkillInterface } from '../../shared/models/skill.interface';

export const employeesFeatureSelector = createFeatureSelector<EmployeesStateInterface>('employees');

export const isLoadingSelector = createSelector(
    employeesFeatureSelector,
    (employeesState: EmployeesStateInterface) => employeesState.isLoading
);

export const listEmployeesSelector = createSelector(
    employeesFeatureSelector,
    (employeesState: EmployeesStateInterface) => employeesState.employeesList
);

export const listEmployeesWithSkillsSelector = createSelector(
    employeesFeatureSelector,
    (employeesState: EmployeesStateInterface) => {
        return employeesState.employeesList.reduce((acc: IEmployeesWithSkills[], employee: EmployeesInterface) => {
            const skillsIds = employee.skills.ids;

            const employeesSkills = skillsIds.map((skillId) =>
                (employeesState.skillsList.find((skill) => skill.id === skillId))
            ) as SkillInterface[];

            const skillName: string[] = employeesSkills.map(skill => skill.name);

            const employeesWithSkills: IEmployeesWithSkills = {
                ...employee,
                employees: employee,
                skills: skillName,
            }
            return [...acc, employeesWithSkills];
        }, []);
    }
)

export const listSkillsSelector = createSelector(
    employeesFeatureSelector,
    (employeesState: EmployeesStateInterface) => employeesState.skillsList
);

export const errorsSelector = createSelector(
    employeesFeatureSelector,
    (employeesState: EmployeesStateInterface) => employeesState.errors
);