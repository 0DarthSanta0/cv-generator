import { BackendErrorsInterface } from '@models/backend-errors.interface';
import { CVsInterface } from '@models/interfaces/cvs.interface';

export interface CVsStateInterface {
  isLoading: boolean,
  cvsList: CVsInterface[],
  errors: BackendErrorsInterface | null,
  cv: CVsInterface | null,
}
