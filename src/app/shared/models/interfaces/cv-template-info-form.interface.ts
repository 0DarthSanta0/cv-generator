import { FormControl } from '@angular/forms';

export interface CVTemplateInfoForm {
  id: FormControl<number>,
  name: FormControl<string>,
  description: FormControl<string>,
  projects: FormControl<(string | undefined)[]>,
  skills: FormControl<(string | undefined)[]>,
  languages: FormControl<(string | undefined)[]>,
}
