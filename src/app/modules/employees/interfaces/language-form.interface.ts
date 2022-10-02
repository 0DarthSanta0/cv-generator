import { FormControl } from '@angular/forms';

export interface LanguageFormInterface {
    languageName: FormControl<string>,
    languageLevel: FormControl<number>,
}