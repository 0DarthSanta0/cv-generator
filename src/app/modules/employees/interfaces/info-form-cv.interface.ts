import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ProjectInfoForm } from '@models/interfaces/project-info-form.interface';

export interface IInfoFormCv {
  id: FormControl<number>,
  nameCv: FormControl<string>,
  firstName: FormControl<string>,
  lastName: FormControl<string>,
  position: FormControl<string>,
  education: FormControl<string>,
  descriptionCv: FormControl<string>,
  skills: FormArray,
  languages: FormArray,
  projects: FormArray<FormGroup<ProjectInfoForm>>
}