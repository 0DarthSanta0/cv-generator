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

    public infoForm: FormGroup<InfoFormInterface>;
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
        });
        (<FormArray>this.infoForm.controls['skills']).push(skillForm);
    }

    public addLanguage(): void {
        const languageForm = this.formBuilder.group<LanguageFormInterface>({
            languageName: this.formBuilder.control('', [Validators.required]),
            languageLevel: this.formBuilder.control(0, [Validators.required])
        });
        (<FormArray>this.infoForm.controls['languages']).push(languageForm);
    }

    public removeLanguage(languageIndex: number): void {
        (<FormArray>this.infoForm.controls['languages']).removeAt(languageIndex);
    }

    public removeSkill(skillIndex: number): void {
        (<FormArray>this.infoForm.controls['skills']).removeAt(skillIndex);
    }

    public onSubmit() {
        const newEmployee: EmployeeFormDtoInterface = <EmployeeFormDtoInterface>this.infoForm.value;
        this.store.dispatch(employeeUpdateAction({newEmployee: newEmployee}));
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
            username: this.formBuilder.control('', [Validators.required]),
            email: this.formBuilder.control('', [Validators.required, Validators.email]),
            education: this.formBuilder.control('', [Validators.required]),
            position: this.formBuilder.control('', [Validators.required]),
            description: this.formBuilder.control('', [Validators.required]),
            skills: this.formBuilder.array([]),
            languages: this.formBuilder.array([]),
        });
    }

    private initializeForm(employeeDto: EmployeeInfoDtoInterface): void {
        this.infoForm.patchValue({
            id: employeeDto.employee.id,
            firstName: employeeDto.employee.firstName,
            lastName: employeeDto.employee.lastName,
            username: employeeDto.employee.username,
            email: employeeDto.employee.email,
            education: employeeDto.employee.education,
            description: employeeDto.employee.description,
            position: employeeDto.employee.position,
        });

        employeeDto.skills.forEach((skill) => {
            const skillGroup = this.formBuilder.group<SkillFormInterface>({
                skillName: this.formBuilder.control(skill.name, [Validators.required]),
                skillLevel: this.formBuilder.control(skill.level, [
                    Validators.required,
                    Validators.max(5),
                    Validators.min(1)
                ]),
            });
            this.infoForm.controls.skills.push(skillGroup);
        });

        employeeDto.languages.forEach((language) => {
            const languageGroup = this.formBuilder.group(<LanguageFormInterface>{
                languageName: this.formBuilder.control(language.name, [Validators.required]),
                languageLevel: this.formBuilder.control(language.level, [
                    Validators.required,
                    Validators.max(5),
                    Validators.min(1)
                ]),
            });
            this.infoForm.controls.languages.push(languageGroup);
        });
    }
}
