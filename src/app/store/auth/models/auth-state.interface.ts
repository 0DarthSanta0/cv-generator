import {CurrentUserInterface} from '@models/current-user.interface';
import {BackendErrorsInterface} from '@models/backend-errors.interface';

export interface AuthStateInterface {
   isSubmitting: boolean,
   isLoading: boolean,
   currentUser: CurrentUserInterface | null,
   isLoggedIn: boolean | null,
   validationErrors: BackendErrorsInterface | null
}