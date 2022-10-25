import { FormArray, FormControl } from '@angular/forms';

export interface ProjectInfoForm {
  name: FormControl<string>,
  id: FormControl<number>,
  domain: FormControl<string>,
  internalName: FormControl<string>,
  description: FormControl<string>,
  from: FormControl<Date | null>,
  to: FormControl<Date | null>,
  skills: FormArray,
  responsibilities?: FormArray
}
