import { BackendErrorsInterface } from '@models/backend-errors.interface';
import { ProjectsInterface } from '@models/interfaces/no-attributes-projects.interface';

export interface ProjectsStateInterface {
  isLoading: boolean,
  projectsList: ProjectsInterface[],
  errors: BackendErrorsInterface | null,
  project: ProjectsInterface | null,
}
