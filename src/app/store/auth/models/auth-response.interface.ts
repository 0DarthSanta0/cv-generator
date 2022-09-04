import {CurrentUserInterface} from "../../../shared/models/current-user.interface";

export interface AuthResponseInterface {
   jwt: string,
   user: CurrentUserInterface
}