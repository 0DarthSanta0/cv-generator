import { AUTO_COMPLETE_AREAS, INPUTS, TEXT_AREAS } from '@constants/cvs-titles';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { CVTemplateInfoForm } from '@models/interfaces/cv-template-info-form.interface';
import { REQUIRED__FIELD_WITH_LENGTH, REQUIRED_FIELD } from '@constants/validation-errors';
import { ProjectsInterface } from '@models/interfaces/no-attributes-projects.interface';
import { SkillInterface } from '@models/skill.interface';
import { LanguageInterface } from '@models/interfaces/language.interface';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { CVsInterface, CVsSimpleInterface } from '@models/interfaces/cvs.interface';
import { AppRoutes } from '@constants/app-routes';
import { selectLanguages, selectSkills } from '@ourStore/main/main-selectors';
import { getProjectsList } from '@ourStore/projects/projects.actions';
import { projectsListSelector } from '@ourStore/projects/projects.selectors';
import { MenuItem } from 'primeng/api';
import { CV_TEMPLATES, MAIN, } from '@constants/breadcrumbs';
import { setBreadcrumbs } from '@ourStore/breadcrumbs/breadcrumbs.actions';
import { languagesList, skillsList } from '@ourStore/main/main-actions';
import { Directive } from '@angular/core';
import { JsonProject } from '@models/interfaces/json-data-response.interface';

@Directive()
export class BaseCvTemplate {
  public readonly inputArray = INPUTS;
  public readonly textAreaArray = TEXT_AREAS;
  public readonly autocompleteArray = AUTO_COMPLETE_AREAS;

  public infoForm: FormGroup<CVTemplateInfoForm>;
  public requiredFieldWithLength = REQUIRED__FIELD_WITH_LENGTH;
  public requiredField = REQUIRED_FIELD;
  public projectsList: string[] = [];
  public skillsList: string[] = [];
  public languagesList: string[] = [];
  public storeProjectsList: ProjectsInterface[] = [];
  public storeSkillsList: SkillInterface[] = [];
  public storeLanguagesList: LanguageInterface[] = [];

  constructor(
    protected store: Store,
    protected route: ActivatedRoute,
    protected formBuilder: NonNullableFormBuilder,
    protected router: Router,
  ) { }

  protected getNewCVTemplate(): CVsInterface {
    const newCV: CVsSimpleInterface = <CVsSimpleInterface>this.infoForm.value;
    return  {
      ...newCV,
      projects: {
        data: this.storeProjectsList.filter(project => newCV.projects.includes(project.name)).map((project): JsonProject => ({
          id: project.id,
          responsibilities: [],
        }))
      },
      skills: {
        data: {
          ids: this.storeSkillsList.filter(skill => newCV.skills.includes(skill.name)).map(skill => skill.id),
        }
      },
      languages: {
        data: {
          ids: this.storeLanguagesList.filter(language => newCV.languages.includes(language.name)).map(language => language.id)
        }
      }
    };
  }

  protected getDataForAutocomplete(): void {
    this.store.dispatch(skillsList());
    this.store.select(selectSkills).subscribe((skills: SkillInterface[]) => {
      this.storeSkillsList = skills;
      this.skillsList = skills.map(skill => skill.name);
    });
    this.store.dispatch(languagesList());
    this.store.select(selectLanguages).subscribe((languages: LanguageInterface[]) => {
      this.storeLanguagesList = languages;
      this.languagesList = languages.map(language => language.name);
    });
    this.store.dispatch(getProjectsList());
    this.store.select(projectsListSelector).subscribe((projects: ProjectsInterface[]) => {
      this.storeProjectsList = projects;
      this.projectsList = projects.map(project => project.name);
    })
  }

  protected setBreadcrumbs(name: string): void {
    const breadcrumbs: MenuItem[] = [
      { label: MAIN, routerLink: AppRoutes.EMPLOYEES_ROUTE },
      { label: CV_TEMPLATES, routerLink: AppRoutes.CV_TEMPLATES_ROUTE},
      { label: name, },
    ];
    this.store.dispatch(setBreadcrumbs({breadcrumbs}));
  }

  protected defineForm(id: number): void {
    this.infoForm = this.formBuilder.group<CVTemplateInfoForm>({
      id: this.formBuilder.control(id, []),
      name: this.formBuilder.control('', [Validators.required]),
      description: this.formBuilder.control('', [Validators.required]),
      projects: this.formBuilder.control([], [Validators.required]),
      skills:  this.formBuilder.control([], [Validators.required]),
      languages:  this.formBuilder.control([], [Validators.required]),
    });
  }
}

