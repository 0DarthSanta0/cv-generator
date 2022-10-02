import { FormControl } from '@angular/forms';

export interface InfoForm {
    firstName: FormControl<string>,
    lastName: FormControl<string>,
    email: FormControl<string>,
    userName: FormControl<string>,
    education: FormControl<string>,
    description: FormControl<string>,
}