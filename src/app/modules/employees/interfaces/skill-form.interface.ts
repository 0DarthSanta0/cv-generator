import { FormControl } from '@angular/forms';

export interface SkillFormInterface {
    skillName: FormControl<string>,
    skillLevel: FormControl<number>
}