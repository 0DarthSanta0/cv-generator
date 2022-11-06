import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { REQUIRED__FIELD_WITH_LENGTH, REQUIRED_FIELD } from '@constants/validation-errors';
import {
  employeeDtoSelector,
  isLoadingSelector,
  listPositionsSelector,
} from '@ourStore/employees/employees.selectors';
import { Observable, Subject, takeUntil } from 'rxjs';
import { EmployeeInfoDtoInterface } from '@models/interfaces/employee-info-dto.interface';
import { IEmployeeFormDto, IInfoForm, ILanguageForm, ISkillForm } from '@employees';
import { employeeByIdAction, employeeUpdateAction } from '@ourStore/employees/employees.actions';
import { EMPL_INFO_INPUT, EMPL_INFO_TEXTAREA } from '@constants/employee';
import { selectLanguages, selectSkills } from '@ourStore/main/main-selectors';
import { MenuItem } from 'primeng/api';
import { EMPLOYEES, MAIN } from '@constants/breadcrumbs';
import { AppRoutes } from '@constants/app-routes';
import { setBreadcrumbs } from '@ourStore/breadcrumbs/breadcrumbs.actions';
import { SkillInterface } from '@models/skill.interface';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeInfoComponent implements OnInit, OnDestroy {

  public readonly inputArray = EMPL_INFO_INPUT;
  public readonly textAreaArray = EMPL_INFO_TEXTAREA;
  public readonly requiredFieldWithLength = REQUIRED__FIELD_WITH_LENGTH;
  public readonly requiredField = REQUIRED_FIELD;

  public infoForm: FormGroup<IInfoForm>;

  public allSkillsName: string[] = [];
  public allLanguagesName: string[] = [];
  public allPositionsName: string[] = [];
  public employeeEmail: string = '';

  public isLoading$: Observable<boolean>;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
  ) {
  }

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(employeeByIdAction({id: +id}));
    }
    this.defineForm();
    this.getDataFromStore();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public addSkill(): void {
    const skillForm = this.formBuilder.group<ISkillForm>({
      skillName: this.formBuilder.control('', [Validators.required]),
      skillLevel: this.formBuilder.control(0, [
        Validators.required,
        Validators.max(5),
        Validators.min(1)
      ])
    });
    this.infoForm.controls.skills.push(skillForm);
  }

  public addLanguage(): void {
    const languageForm = this.formBuilder.group<ILanguageForm>({
      languageName: this.formBuilder.control('', [Validators.required]),
      languageLevel: this.formBuilder.control(0, [
        Validators.required,
        Validators.max(5),
        Validators.min(1)
      ])
    });
    this.infoForm.controls.languages.push(languageForm);
  }

  public removeLanguage(languageIndex: number): void {
    this.infoForm.controls.languages.removeAt(languageIndex);
  }

  public removeSkill(skillIndex: number): void {
    this.infoForm.controls.skills.removeAt(skillIndex);
  }

  public updateEmployeeInfo() {
    const newEmployee: IEmployeeFormDto = <IEmployeeFormDto>this.infoForm.value;
    this.store.dispatch(employeeUpdateAction({newEmployee: newEmployee}));
  }

  private getDataFromStore(): void {
    this.store.pipe(
      select(selectSkills),
      takeUntil(this.destroy$)
    )
      .subscribe((skills) => {
        skills.forEach(skill => this.allSkillsName = [...this.allSkillsName, skill.name]);
      });

    this.store.pipe(
      select(selectLanguages),
      takeUntil(this.destroy$)
    )
      .subscribe((languages) => {
        languages.forEach(language => this.allLanguagesName.push(language.name));
      });

    this.store.pipe(
      select(employeeDtoSelector),
      takeUntil(this.destroy$)
    )
      .subscribe((employeeDto) => {
        if (employeeDto.employee) {
          this.employeeEmail = employeeDto.employee.email;
          this.setBreadcrumbs();
          this.initializeForm(employeeDto);
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
    this.infoForm = this.formBuilder.group<IInfoForm>({
      id: this.formBuilder.control(0, []),
      firstName: this.formBuilder.control('', [Validators.required]),
      lastName: this.formBuilder.control('', [Validators.required]),
      username: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      education: this.formBuilder.control('', [Validators.required]),
      position: this.formBuilder.control('', [Validators.required]),
      description: this.formBuilder.control('', [Validators.required]),
      skills: this.formBuilder.array([],[
        Validators.required,
        Validators.max(5),
        Validators.min(1)
      ]),
      languages: this.formBuilder.array([],[
        Validators.required,
        Validators.max(5),
        Validators.min(1)
      ]),
    });
  }

  private setBreadcrumbs(): void {
    const breadcrumbs: MenuItem[] = [
      {label: MAIN },
      {label: EMPLOYEES, routerLink: AppRoutes.EMPLOYEES_ROUTE},
      {label: this.employeeEmail},
    ];
    this.store.dispatch(setBreadcrumbs({breadcrumbs}));
  }

  private initializeForm(employeeDto: EmployeeInfoDtoInterface): void {
    this.infoForm.controls.skills.clear();
    this.infoForm.controls.languages.clear();

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
      const skillGroup = this.formBuilder.group<ISkillForm>({
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
      const languageGroup = this.formBuilder.group(<ILanguageForm>{
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
