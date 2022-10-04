import { PositionInterface } from '@models/interfaces/position.interface';
import { JsonData, JsonResponse } from '@models/interfaces/json-data-response.interface';

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
    languages: JsonResponse<JsonData[]>,
    skills: JsonResponse<JsonData[]>,
}