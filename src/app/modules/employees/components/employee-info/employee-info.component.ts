import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { REQUIRED_FIELD } from '@constants/validation-errors';
import {
  employeeDTOSelector,
  isLoadingSelector,
  isSubmittingEmplInfo,
  listLanguagesSelector,
  listSkillsSelector
} from '@ourStore/employees/employees.selectors';
import { Observable } from 'rxjs';
import { EmployeeInfoDtoInterface } from '@models/interfaces/employee-info-dto.interface';
import { LanguageFormInterface } from '../../interfaces/language-form.interface';
import { SkillFormInterface } from '../../interfaces/skill-form.interface';
import { EmployeesService } from '@services/http/employees.service';
import { employeeByIdAction } from '@ourStore/employees/employees.actions';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeInfoComponent implements OnInit {

  public infoForm: FormGroup;
  public requiredField = REQUIRED_FIELD;
  public allSkillsName: string[] = [];
  public allLanguagesName: string[] = [];

  public isLoading$: Observable<boolean>;
  public isSubmittingEmplInfo$: Observable<boolean>;

  constructor(
      private store: Store,
      private route: ActivatedRoute,
      private formBuilder: NonNullableFormBuilder,
      private service: EmployeesService
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
      this.store.dispatch(employeeByIdAction({id:+id}));
    }

    this.defineForm();
    this.getDataFromStore();
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
    // this.service.addSkillToEmployee(12, {
    //   skills: {
    //     "data": [
    //       {
    //         "id": 4,
    //         "level": 5
    //       },
    //       {
    //         "id": 3,
    //         "level": 5
    //       },
    //       {
    //         "id": 1,
    //         "level": 4
    //       },
    //       {
    //         "id": 2,
    //         "level": 2
    //       },
    //     ]
    //   }
    //
    // })
  }

  private getDataFromStore(): void {
    this.store.pipe(select(listSkillsSelector))
        .subscribe((skills) => {
          skills.forEach(skill => this.allSkillsName.push(skill.name));
        });

    this.store.pipe(select(listLanguagesSelector))
        .subscribe((languages) => {
          languages.forEach(language => this.allLanguagesName.push(language.name));
        });

    this.store.pipe(select(employeeDTOSelector))
        .subscribe((employeeDTO) => {
          if (employeeDTO) {
            this.initializeForm(employeeDTO);
          }
        })
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.isSubmittingEmplInfo$ = this.store.pipe(select(isSubmittingEmplInfo));
  }

  private defineForm(): void {
    this.infoForm = this.formBuilder.group({
      firstName: this.formBuilder.control('', [Validators.required]),
      lastName: this.formBuilder.control('', [Validators.required]),
      userName: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      education: this.formBuilder.control('', [Validators.required]),
      description: this.formBuilder.control('', [Validators.required]),
      skills: this.formBuilder.array([]),
      languages: this.formBuilder.array([]),
    });
  }

  private initializeForm(employeeDTO: EmployeeInfoDtoInterface): void {
    this.infoForm.patchValue({
      firstName: employeeDTO.employee.firstName,
      lastName: employeeDTO.employee.lastName,
      userName: employeeDTO.employee.username,
      email: employeeDTO.employee.email,
      education: employeeDTO.employee.education,
      description: employeeDTO.employee.description,
    });

    employeeDTO.skills.forEach(skill => {
      this.skills.push(
          this.formBuilder.group({
            skillName: new FormControl(skill.name, [Validators.required]),
            skillLevel: new FormControl(skill.level, [Validators.required]),
          })
      )
    });

    employeeDTO.languages.forEach(language => {
      this.languages.push(
          this.formBuilder.group({
            languageName: new FormControl(language.name, [Validators.required]),
            languageLevel: new FormControl(language.level, [Validators.required]),
          })
      )
    });
  }
}
