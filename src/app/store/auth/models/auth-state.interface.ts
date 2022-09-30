import { UserInterface } from '@models/user.interface';
import { BackendErrorsInterface } from '@models/backend-errors.interface';

export interface AuthStateInterface {
   isSubmitting: boolean,
   isLoading: boolean,
   currentUser: UserInterface | null,
   isLoggedIn: boolean | null,
   validationErrors: BackendErrorsInterface | null
}