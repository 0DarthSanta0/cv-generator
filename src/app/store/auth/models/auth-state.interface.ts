import {CurrentUserInterface} from "../../../shared/models/current-user.interface";
import {BackendErrorsInterface} from "../../../shared/models/backend-errors.interface";

export interface AuthStateInterface {
   isSubmitting: boolean,
   currentUser: CurrentUserInterface | null,
   isLoggedIn: boolean | null,
   validationErrors: BackendErrorsInterface | null
}