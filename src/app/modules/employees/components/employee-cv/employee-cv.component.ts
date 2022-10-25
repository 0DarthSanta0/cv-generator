import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import {
  BUTTON_LABEL,
  EMPL_CV_INPUT,
  EMPL_CV_PROJECTS_AUTOCOMPLETE,
  EMPL_CV_PROJECTS_INPUT,
  EMPL_INFO_TEXTAREA
} from '@constants/employee';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { REQUIRED__FIELD_WITH_LENGTH, REQUIRED_FIELD } from '@constants/validation-errors';
import { ICvFormResponse, IInfoFormCv, ILanguageForm, ISkillForm } from '@employees';
import { SkillInterface } from '@models/skill.interface';
import { LanguageInterface } from '@models/interfaces/language.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ISearchInputForm } from '@models/interfaces/search-input-form.interface';
import { selectLanguages, selectResponsibilities, selectSkills } from '@ourStore/main/main-selectors';
import { ProjectInfoForm } from '@models/interfaces/project-info-form.interface';

@Component({
  selector: 'app-employee-cv',
  templateUrl: './employee-cv.component.html',
  styleUrls: ['./employee-cv.component.scss']
})
export class EmployeeCvComponent implements OnInit, OnDestroy {

  public readonly inputArray = EMPL_CV_INPUT;
  public readonly inputProjectArray = EMPL_CV_PROJECTS_INPUT;
  public readonly autoCompleteArray = EMPL_CV_PROJECTS_AUTOCOMPLETE;
  public readonly textAreaArray = EMPL_INFO_TEXTAREA;

  public cvInfoForm: FormGroup<IInfoFormCv>;
  public searchInput: FormGroup<ISearchInputForm>;

  public requiredFieldWithLength = REQUIRED__FIELD_WITH_LENGTH;
  public requiredField = REQUIRED_FIELD;
  public techStack: string[] = [];
  public allLanguagesName: string[] = [];
  public responsibilities: string[] = [];
  public isLoading: boolean = false;
  public isPreview: boolean = false;
  public searchingText: string = '';
  public buttonLabel: string = BUTTON_LABEL;

  public cv: ICvFormResponse;

  // public employeeCvs$: Observable<ICvResponse[]> = this.store.pipe(select(selectCvsListForEmployee));
  public fakeListCv: { name: string }[] = [{name: 'aaa'}, {name: 'bbb'}, {name: 'ccc'}];
  // public cv$: Observable<EmployeeCvDtoInterface> = this.store.pipe(select(selectCvDtoForEmployee));
  public isDownload$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private formBuilder: NonNullableFormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.getDataFromStore();
    // this.store.dispatch(cvsForEmpl());
    this.defineForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public deleteCv(id: number) {
    // this.store.dispatch(deleteCv({id: id}));
  }

  public openCv(id: number) {
    //получаем cv по id
    //получаем из cv инфу
    // добавляем эту инфу в форму

    // this.store.dispatch(cvForEmpl({id: id}));
    // this.store.pipe(
    //   select(selectCvDtoForEmployee),
    //   takeUntil(this.destroy$)
    // ).subscribe((cv) => {
    //   this.initializeForm(cv);
    //   this.isLoading = true;
    // })
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

  public addProject(): void {
    // const projectGroup = this.formBuilder.group(<IProjectFrom>{
    //   id: this.formBuilder.control(0, []),
    //   name: this.formBuilder.control('', [Validators.required,]),
    //   description: this.formBuilder.control('', [Validators.required,]),
    //   domain: this.formBuilder.control('', [Validators.required,]),
    //   from: this.formBuilder.control('', [Validators.required,]),
    //   to: this.formBuilder.control('', [Validators.required,]),
    //   internalName: this.formBuilder.control('', [Validators.required,]),
    //   techStack: this.formBuilder.control([], [Validators.required,]),
    //   responsibilities: this.formBuilder.control([], [Validators.required,]),
    // });
    // this.cvInfoForm.controls.projects.push(projectGroup);
  }

  public removeLanguage(languageIndex: number): void {
    this.cvInfoForm.controls.languages.removeAt(languageIndex);
  }

  public removeSkill(skillIndex: number): void {
    this.cvInfoForm.controls.skills.removeAt(skillIndex);
  }

  public removeProject(projectIndex: number): void {
    // this.cvInfoForm.controls.projects.removeAt(projectIndex);
  }

  public onSubmit(): void {
    // const newCv: ICvFormResponseDto = <ICvFormResponseDto>this.cvInfoForm.value;
    // this.store.dispatch(cvUpdate({newCv: newCv}));
  }

  public createPreview(): void {
    // this.cv = <ICvFormResponseDto>this.cvInfoForm.value;
    this.isPreview = !this.isPreview;
    this.isPreview ? this.buttonLabel = 'Back' : this.buttonLabel = 'Preview'
  }

  public downloadPdf(): void {
    this.isDownload$.next(true);
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
  }

  // private initializeForm(cvDto: EmployeeCvDtoInterface): void {
  //   this.cvInfoForm.controls.languages.clear();
  //   this.cvInfoForm.controls.skills.clear();
  //   this.cvInfoForm.controls.projects.clear();
  //
  //   this.cvInfoForm.patchValue({
  //     id: cvDto.id,
  //     firstName: cvDto.firstName,
  //     lastName: cvDto.lastName,
  //     education: cvDto.education,
  //     descriptionCv: cvDto.descriptionCv,
  //     nameCv: cvDto.nameCv,
  //   });
  //
  //   if (cvDto.skills && cvDto.languages && cvDto.projects) {
  //     this.patchSkills(cvDto.skills);
  //     this.patchLanguages(cvDto.languages);
  //     this.patchProjects(cvDto.projects);
  //   }
  //
  // }

  private defineForm(): void {
    this.searchInput = this.formBuilder.group<ISearchInputForm>({
      text: this.formBuilder.control('', []),
    })

    this.searchInput.controls.text.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((text) => {
      this.searchingText = text;
    })

    this.cvInfoForm = this.formBuilder.group<IInfoFormCv>({
      id: this.formBuilder.control(0, []),
      nameCv: this.formBuilder.control('', [Validators.required]),
      firstName: this.formBuilder.control('', [Validators.required]),
      lastName: this.formBuilder.control('', [Validators.required]),
      education: this.formBuilder.control('', [Validators.required]),
      descriptionCv: this.formBuilder.control('', [Validators.required]),
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
        responsibilities: this.formBuilder.array([], []),
        skills: this.formBuilder.array([], []),
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

  // private patchProjects(projects: IProject[]): void {
  //   projects.forEach((project) => {
  //
  //     const projectGroup = this.formBuilder.group(<IProjectFrom>{
  //       id: this.formBuilder.control(project.id, []),
  //       name: this.formBuilder.control(project.name, [Validators.required,]),
  //       description: this.formBuilder.control(project.description, [Validators.required,]),
  //       domain: this.formBuilder.control(project.domain, [Validators.required,]),
  //       from: this.formBuilder.control(project.from, [Validators.required,]),
  //       to: this.formBuilder.control(project.to, [Validators.required,]),
  //       internalName: this.formBuilder.control(project.internalName, [Validators.required,]),
  //       techStack: this.formBuilder.control(project.techStack.map((stack) => stack.name), [Validators.required,]),
  //       responsibilities: this.formBuilder.control(project.responsibilities, [Validators.required,]),
  //     });
  //     if (projectGroup) {
  //       this.cvInfoForm.controls.projects.push(projectGroup);
  //     }
  //   });
  // }

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
