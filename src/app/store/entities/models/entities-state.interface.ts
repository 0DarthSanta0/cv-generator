import { BackendErrorsInterface } from '@models/backend-errors.interface';

export interface IEntitiesState {
  isLoading: boolean,
  errors: BackendErrorsInterface | null,
}