import { BehaviorSubject, map, Observable, Subject, takeUntil } from 'rxjs';
import {
  BUTTON_LABEL,
  EMPL_CV_INPUT,
  EMPL_CV_PROJECTS_AUTOCOMPLETE,
  EMPL_CV_PROJECTS_INPUT,
  EMPL_INFO_TEXTAREA
} from '@constants/employee';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { REQUIRED__FIELD_WITH_LENGTH, REQUIRED_FIELD } from '@constants/validation-errors';
import { ICvFormResponse, IInfoFormCv, ILanguageForm, ISkillForm } from '@employees';
import { SkillInterface } from '@models/skill.interface';
import { LanguageInterface } from '@models/interfaces/language.interface';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectLanguages, selectResponsibilities, selectSkills } from '@ourStore/main/main-selectors';
import { ProjectInfoForm } from '@models/interfaces/project-info-form.interface';
import { CV_TABLE_COLUMN } from '@constants/cv';
import {
  deleteEmployeeCv,
  employeeByIdAction,
  employeeCvsList,
  openCv,
  setCvTemplateToEmployee,
  updateCv
} from '@ourStore/employees/employees.actions';
import { JsonEmployeeCv, JsonProjectCv } from '@models/interfaces/json-data-response.interface';
import {
  employeeCvsListSelector,
  employeeDtoSelector,
  selectEmployeeCv
} from '@ourStore/employees/employees.selectors';
import { EmployeeCvDtoInterface } from '@models/interfaces/employee-cv-dto.interface';
import { ProjectsInterface } from '@models/interfaces/no-attributes-projects.interface';
import { projectsListSelector } from '@ourStore/projects/projects.selectors';
import { COLUMNS_NAMES } from '@constants/projects-titles';
import { ActivatedRoute } from '@angular/router';
import { cvsListSelector } from '@ourStore/cvs/cvs.selectors';
import { CVsInterface } from '@models/interfaces/cvs.interface';
import { getCVsList } from '@ourStore/cvs/cvs.actions';
import { CustomDateValidators } from '../../../../shared/validators/date-picker-validator';

@Component({
  selector: 'app-employee-cv',
  templateUrl: './employee-cv.component.html',
  styleUrls: ['./employee-cv.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeCvComponent implements OnInit, OnDestroy {

  public inputArray = EMPL_CV_INPUT;
  public inputProjectArray = EMPL_CV_PROJECTS_INPUT;
  public autoCompleteArray = EMPL_CV_PROJECTS_AUTOCOMPLETE;
  public textAreaArray = EMPL_INFO_TEXTAREA;
  public requiredFieldWithLength = REQUIRED__FIELD_WITH_LENGTH;
  public requiredField = REQUIRED_FIELD;
  public cvTable: string[] = CV_TABLE_COLUMN;
  public projectsTable: string[] = COLUMNS_NAMES;
  public buttonLabel: string = BUTTON_LABEL;
  public searchingText: string = '';

  public cvInfoForm: FormGroup<IInfoFormCv>;
  public searchInput: FormControl<string>;

  public techStack: string[] = [];
  public allLanguagesName: string[] = [];
  public responsibilities: string[] = [];

  public isLoading: boolean = false;
  public isPreview: boolean = false;
  public displayCvsModal: boolean = false;
  public displayProjectsModal: boolean = false;

  public cv: ICvFormResponse;

  public employeeCvs$: Observable<JsonEmployeeCv[]> = this.store.pipe(select(employeeCvsListSelector));
  public allCvsTemplate$: Observable<CVsInterface[]>;
  public allProjects$: Observable<ProjectsInterface[]> = this.store.pipe(
    select(projectsListSelector),
    map((projects) => [...projects])
  );

  public isDownload$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private formBuilder: NonNullableFormBuilder,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.getDataFromStore();
    this.store.dispatch(employeeCvsList());
    this.store.dispatch(getCVsList());
    this.defineForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openCv(id: number) {
    this.store.pipe(
      select(employeeDtoSelector),
      takeUntil(this.destroy$)
    ).subscribe((employee) => {
      this.store.dispatch(openCv({idCv: id, employee: employee}));
    })

    this.store.pipe(
      select(selectEmployeeCv),
      takeUntil(this.destroy$)
    ).subscribe((cv) => {
      this.initializeForm(cv);
      this.isLoading = true;
    })
  }

  public updateCv(): void {
    const newCv: ICvFormResponse = <ICvFormResponse>this.cvInfoForm.value;
    this.store.dispatch(updateCv({newCv: newCv}));

    this.updateEmployeeDto();
  }

  public addSkill(): void {
    const skillForm = this.formBuilder.group<ISkillForm>({
      skillName: this.formBuilder.control('', [Validators.required]),
      skillLevel: this.formBuilder.control(0, [Validators.required])
    });
    this.cvInfoForm.controls.skills.push(skillForm);
  }

  public addLanguage(): void {
    const languageForm = this.formBuilder.group<ILanguageForm>({
      languageName: this.formBuilder.control('', [Validators.required]),
      languageLevel: this.formBuilder.control(0, [Validators.required])
    });
    this.cvInfoForm.controls.languages.push(languageForm);
  }

  public addProjectFormGroup(id: string): void {
    this.allProjects$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((projects) => {
      projects.filter((project) => {
        if (project.id === +id) {
          const projectGroup = this.formBuilder.group(<ProjectInfoForm>{
            id: this.formBuilder.control(project.id, []),
            name: this.formBuilder.control(project.name, [Validators.required]),
            description: this.formBuilder.control(project.description, [Validators.required]),
            domain: this.formBuilder.control(project.domain, [Validators.required]),
            from: this.formBuilder.control(project.from, [Validators.required]),
            to: this.formBuilder.control(project.to, [Validators.required]),
            internalName: this.formBuilder.control(project.internalName, [Validators.required]),
            responsibilities: this.formBuilder.control([], [Validators.required]),
            techStack: this.formBuilder.control([], [Validators.required]),
            skills: this.formBuilder.control([])
          },{
            validators: [
              CustomDateValidators.fromToDate('from', 'to')
            ]
          });
          this.cvInfoForm.controls.projects.push(projectGroup);
          this.displayProjectsModal = false;
        }
      })
    });
  }

  public removeLanguage(languageIndex: number): void {
    this.cvInfoForm.controls.languages.removeAt(languageIndex);
  }

  public removeSkill(skillIndex: number): void {
    this.cvInfoForm.controls.skills.removeAt(skillIndex);
  }

  public removeProject(projectIndex: number): void {
    this.cvInfoForm.controls.projects.removeAt(projectIndex);
  }

  public setCvToEmployee(idCvTemplate: string) {
    this.store.dispatch(setCvTemplateToEmployee({idCv: +idCvTemplate}));

    this.updateEmployeeDto();

    this.displayCvsModal = false;
  }

  public deleteCv(id: number) {
    this.store.dispatch(deleteEmployeeCv({idCv: id}));
    this.updateEmployeeDto();
  }

  public createPreview(): void {
    this.cv = <ICvFormResponse>this.cvInfoForm.value;
    this.isPreview = !this.isPreview;
    this.isPreview ? this.buttonLabel = 'Back' : this.buttonLabel = 'Preview';
    this.isDownload$.next(false);
  }

  public downloadPdf(): void {
    this.isDownload$.next(true);
  }

  private updateEmployeeDto(): void {
    const idEmployee = this.route.snapshot.paramMap.get('id');

    if (idEmployee) {
      this.store.dispatch(employeeByIdAction({id: +idEmployee}));
      this.store.dispatch(employeeCvsList());
      this.employeeCvs$ = this.store.pipe(select(employeeCvsListSelector));
    }
  }

  private initializeForm(cvDto: EmployeeCvDtoInterface): void {
    this.cvInfoForm.controls.languages.clear();
    this.cvInfoForm.controls.skills.clear();
    this.cvInfoForm.controls.projects.clear();

    this.cvInfoForm.patchValue({
      id: cvDto.id,
      firstName: cvDto.firstName,
      lastName: cvDto.lastName,
      education: cvDto.education,
      descriptionCv: cvDto.descriptionCv,
      nameCv: cvDto.nameCv,
      position: cvDto.position
    });

    if (cvDto.skills && cvDto.languages && cvDto.projects) {
      this.patchSkills(cvDto.skills);
      this.patchLanguages(cvDto.languages);
      this.patchProjects(cvDto.projects);
    }

  }

  private getDataFromStore(): void {
    this.store.pipe(
      select(selectSkills),
      takeUntil(this.destroy$)
    )
      .subscribe((skills) => {
        skills.forEach(skill => this.techStack.push(skill.name));
      });

    this.store.pipe(
      select(selectLanguages),
      takeUntil(this.destroy$)
    )
      .subscribe((languages) => {
        languages.forEach(language => this.allLanguagesName.push(language.name));
      });

    this.store.pipe(
      select(selectResponsibilities),
      takeUntil(this.destroy$)
    )
      .subscribe((responsibilities) => {
        responsibilities.forEach(responsibility => this.responsibilities.push(responsibility.name));
      });

    this.allCvsTemplate$ = this.store.pipe(select(cvsListSelector));

  }

  private patchProjects(projects: JsonProjectCv[]): void {
    projects.forEach((project) => {

      const projectGroup = this.formBuilder.group(<ProjectInfoForm>{
        id: this.formBuilder.control(project.id, []),
        name: this.formBuilder.control(project.name, []),
        description: this.formBuilder.control(project.description, []),
        domain: this.formBuilder.control(project.domain, []),
        from: this.formBuilder.control(project.from, []),
        to: this.formBuilder.control(project.to, []),
        internalName: this.formBuilder.control(project.internalName, []),
        techStack: this.formBuilder.control(project.skills, []),
        responsibilities: this.formBuilder.control(project.responsibilities, []),
      },{
        validators: [
          CustomDateValidators.fromToDate('from', 'to')
        ]
      });
      if (projectGroup) {
        this.cvInfoForm.controls.projects.push(projectGroup);
      }
    });
  }

  private defineForm(): void {
    this.searchInput = this.formBuilder.control<string>('')

    this.searchInput.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((text) => {
      this.searchingText = text;
    });

    this.cvInfoForm = this.formBuilder.group<IInfoFormCv>({
      id: this.formBuilder.control(0, []),
      nameCv: this.formBuilder.control('', []),
      firstName: this.formBuilder.control('', []),
      lastName: this.formBuilder.control('', []),
      position: this.formBuilder.control('', []),
      education: this.formBuilder.control('', []),
      descriptionCv: this.formBuilder.control('', []),
      skills: this.formBuilder.array([]),
      languages: this.formBuilder.array([]),
      projects: this.formBuilder.array([this.formBuilder.group<ProjectInfoForm>({
        id: this.formBuilder.control(0, []),
        name: this.formBuilder.control('', []),
        description: this.formBuilder.control('', []),
        domain: this.formBuilder.control('', []),
        from: this.formBuilder.control(new Date(), []),
        to: this.formBuilder.control(new Date(), []),
        internalName: this.formBuilder.control('', []),
        responsibilities: this.formBuilder.control([], []),
        techStack: this.formBuilder.control([], []),
        skills: this.formBuilder.control([])
      },{
        validators: [
          CustomDateValidators.fromToDate('from', 'to')
        ]
      })]),
    });
  }

  private patchSkills(skills: SkillInterface[]): void {
    skills.forEach((skill) => {
      const skillGroup = this.formBuilder.group<ISkillForm>({
        skillName: this.formBuilder.control(skill.name, [Validators.required]),
        skillLevel: this.formBuilder.control(skill.level, [
          Validators.required,
          Validators.max(5),
          Validators.min(1)
        ]),
      });
      this.cvInfoForm.controls.skills.push(skillGroup);
    });
  }

  private patchLanguages(languages: LanguageInterface[]): void {
    languages.forEach((language) => {
      const languageGroup = this.formBuilder.group(<ILanguageForm>{
        languageName: this.formBuilder.control(language.name, [Validators.required]),
        languageLevel: this.formBuilder.control(language.level, [
          Validators.required,
          Validators.max(5),
          Validators.min(1)
        ]),
      });
      this.cvInfoForm.controls.languages.push(languageGroup);
    });
  }
}
