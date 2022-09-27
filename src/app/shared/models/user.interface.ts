import { IdsListInterface } from './interfaces/ids-list.interface';

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
    cvs: IdsListInterface,
    languages: IdsListInterface,
    skills: IdsListInterface,
}