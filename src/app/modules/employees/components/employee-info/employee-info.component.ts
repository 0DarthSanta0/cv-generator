import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { REQUIRED__FIELD_WITH_LENGTH, REQUIRED_FIELD } from '@constants/validation-errors';
import {
    employeeDTOSelector,
    isLoadingSelector,
    listLanguagesSelector,
    listPositionsSelector,
    listSkillsSelector
} from '@ourStore/employees/employees.selectors';
import { Observable, Subject, takeUntil } from 'rxjs';
import { EmployeeInfoDtoInterface } from '@models/interfaces/employee-info-dto.interface';
import { EmployeeFormDtoInterface, InfoFormInterface, LanguageFormInterface, SkillFormInterface } from '@employees';
import { employeeByIdAction, employeeUpdateAction } from '@ourStore/employees/employees.actions';

@Component({
    selector: 'app-employee-info',
    templateUrl: './employee-info.component.html',
    styleUrls: ['./employee-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeInfoComponent implements OnInit, OnDestroy {

    public infoForm: FormGroup;
    public requiredFieldWithLength = REQUIRED__FIELD_WITH_LENGTH;
    public requiredField = REQUIRED_FIELD;
    public allSkillsName: string[] = [];
    public allLanguagesName: string[] = [];
    public allPositionsName: string[] = [];

    public isLoading$: Observable<boolean>;

    private destroy$ = new Subject<void>();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private formBuilder: NonNullableFormBuilder,
    ) {
    }

    public get skills(): FormArray {
        return this.infoForm.controls['skills'] as FormArray;
    }

    public get languages(): FormArray {
        return this.infoForm.controls['languages'] as FormArray;
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.store.dispatch(employeeByIdAction({id: +id}));
        }

        this.defineForm();
        this.getDataFromStore();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public addSkill(): void {
        const skillForm = this.formBuilder.group<SkillFormInterface>({
            skillName: this.formBuilder.control('', [Validators.required]),
            skillLevel: this.formBuilder.control(0, [Validators.required])
        })
        this.skills.push(skillForm);
    }

    public addLanguage(): void {
        const languageForm = this.formBuilder.group<LanguageFormInterface>({
            languageName: this.formBuilder.control('', [Validators.required]),
            languageLevel: this.formBuilder.control(0, [Validators.required])
        })
        this.languages.push(languageForm);
    }

    public removeLanguage(languageIndex: number): void {
        this.languages.removeAt(languageIndex);
    }

    public removeSkill(skillIndex: number): void {
        this.skills.removeAt(skillIndex);
    }

    public onSubmit() {
        const employeeForm: EmployeeFormDtoInterface = this.infoForm.value;
        this.store.dispatch(employeeUpdateAction({newEmployee: employeeForm}));
    }

    private getDataFromStore(): void {
        this.store.pipe(
            select(listSkillsSelector),
            takeUntil(this.destroy$)
        )
            .subscribe((skills) => {
                skills.forEach(skill => this.allSkillsName.push(skill.name));
            });

        this.store.pipe(
            select(listLanguagesSelector),
            takeUntil(this.destroy$)
        )
            .subscribe((languages) => {
                languages.forEach(language => this.allLanguagesName.push(language.name));
            });

        this.store.pipe(
            select(employeeDTOSelector),
            takeUntil(this.destroy$)
        )
            .subscribe((employeeDTO) => {
                if (employeeDTO) {
                    this.initializeForm(employeeDTO);
                }
            });

        this.store.pipe(
            select(listPositionsSelector),
            takeUntil(this.destroy$)
        ).subscribe((positions) => {
            positions.forEach(position => this.allPositionsName.push(position.name));
        });

        this.isLoading$ = this.store.pipe(select(isLoadingSelector));

    }

    private defineForm(): void {
        this.infoForm = this.formBuilder.group<InfoFormInterface>({
            id: this.formBuilder.control(0, []),
            firstName: this.formBuilder.control('', [Validators.required]),
            lastName: this.formBuilder.control('', [Validators.required]),
            userName: this.formBuilder.control('', [Validators.required]),
            email: this.formBuilder.control('', [Validators.required, Validators.email]),
            education: this.formBuilder.control('', [Validators.required]),
            position: this.formBuilder.control('', [Validators.required]),
            description: this.formBuilder.control('', [Validators.required]),
            skills: this.formBuilder.array([]),
            languages: this.formBuilder.array([]),
        });
    }

    private initializeForm(employeeDTO: EmployeeInfoDtoInterface): void {
        this.infoForm.patchValue({
            id: employeeDTO.employee.id,
            firstName: employeeDTO.employee.firstName,
            lastName: employeeDTO.employee.lastName,
            userName: employeeDTO.employee.username,
            email: employeeDTO.employee.email,
            education: employeeDTO.employee.education,
            description: employeeDTO.employee.description,
            position: employeeDTO.employee.position,
        });

        employeeDTO.skills.forEach(skill => {
            this.skills.push(
                this.formBuilder.group<SkillFormInterface>({
                    skillName: this.formBuilder.control(skill.name, [Validators.required]),
                    skillLevel: this.formBuilder.control(skill.level, [
                        Validators.required,
                        Validators.max(5),
                        Validators.min(1)
                    ]),
                })
            )
        });

        employeeDTO.languages.forEach(language => {
            this.languages.push(
                this.formBuilder.group(<LanguageFormInterface>{
                    languageName: this.formBuilder.control(language.name, [Validators.required]),
                    languageLevel: this.formBuilder.control(language.level, [
                        Validators.required,
                        Validators.max(5),
                        Validators.min(1)
                    ]),
                })
            )
        });
    }
}
