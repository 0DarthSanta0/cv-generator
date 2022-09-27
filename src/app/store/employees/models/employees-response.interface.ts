import { PositionInterface } from '../../../shared/models/interfaces/position.interface';
import { JsonDataResponseInterface } from '../../../shared/models/interfaces/json-data-response.interface';

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
    languages: JsonDataResponseInterface,
    skills: JsonDataResponseInterface,
}