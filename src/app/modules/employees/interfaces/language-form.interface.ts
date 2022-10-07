import { FormControl } from '@angular/forms';

export interface ILanguageForm {
    languageName: FormControl<string>,
    languageLevel: FormControl<number>,
}

export interface ILanguageFormResponse {
    languageName: string,
    languageLevel: number,
}