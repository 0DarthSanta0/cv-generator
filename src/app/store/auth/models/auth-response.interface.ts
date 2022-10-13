import {UserInterface} from "../../../shared/models/user.interface";

export interface AuthResponseInterface {
   jwt: string,
   user: UserInterface
}