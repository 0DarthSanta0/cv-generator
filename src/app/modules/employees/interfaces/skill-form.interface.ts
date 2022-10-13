import { FormControl } from '@angular/forms';

export interface ISkillForm {
    skillName: FormControl<string>,
    skillLevel: FormControl<number | undefined>
}

export interface ISkillFormResponse {
    skillName: string,
    skillLevel: number,
}