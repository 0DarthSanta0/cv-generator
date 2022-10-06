import { FormArray, FormControl } from '@angular/forms';

export interface InfoFormInterface {
    firstName: FormControl<string>,
    id: FormControl<number>,
    lastName: FormControl<string>,
    email: FormControl<string>,
    username: FormControl<string>,
    education: FormControl<string>,
    description: FormControl<string>,
    position: FormControl<string | number>,
    skills: FormArray,
    languages: FormArray
}