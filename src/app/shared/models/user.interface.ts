import { JsonDataResponseInterface } from './interfaces/json-data-response.interface';

export interface UserInterface {
    id: number,
    username: string,
    firstName: string,
    lastName: string
    email: string,
    education: string,
    description: string,
    jwt: string,
    position: string,
    languages: JsonDataResponseInterface,
    skills: JsonDataResponseInterface,
}