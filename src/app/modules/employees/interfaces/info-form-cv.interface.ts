import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface IInfoFormCv {
  id: FormControl<number>,
  nameCv: FormControl<string>,
  firstName: FormControl<string>,
  lastName: FormControl<string>,
  education: FormControl<string>,
  descriptionCv: FormControl<string>,
  skills: FormArray,
  languages: FormArray,
  // projects: FormArray<FormGroup<IProjectFrom>>
}