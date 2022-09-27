import { PositionInterface } from '../../../shared/models/interfaces/position.interface';

export interface EmployeesResponseInterface {
    id: number,
    username: string,
    firstName: string,
    lastName: string
    email: string,
    education: string,
    description: string,
    jwt: string,
    position: PositionInterface,
    cvs: {
        ids: number[]
    },
    languages: {
        ids: number[]
    },
    skills: {
        ids: number[],
    },
}