import {UserInterface} from "../../../shared/models/user.interface";
import {BackendErrorsInterface} from "../../../shared/models/backend-errors.interface";

export interface AuthStateInterface {
   isSubmitting: boolean,
   isLoading: boolean,
   currentUser: UserInterface | null,
   isLoggedIn: boolean | null,
   validationErrors: BackendErrorsInterface | null
}