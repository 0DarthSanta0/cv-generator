import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { REQUIRED__FIELD_WITH_LENGTH, REQUIRED_FIELD } from '@constants/validation-errors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from '@constants/app-routes';
import { MenuItem } from 'primeng/api';
import { CV_TEMPLATES, MAIN } from '@constants/breadcrumbs';
import { CVTemplateInfoForm } from '@models/interfaces/cv-template-info-form.interface';
import { getCVById, updateCV } from '@ourStore/cvs/cvs.actions';
import { CVsInterface, CVsSimpleInterface } from '@models/interfaces/cvs.interface';
import { setBreadcrumbs } from '@ourStore/breadcrumbs/breadcrumbs.actions';
import { cvSelector, isLoadingCVSelector } from '@ourStore/cvs/cvs.selectors';
import { INPUTS, TEXT_AREAS } from '@constants/cvs-titles';
import { ProjectsInterface } from '@models/interfaces/no-attributes-projects.interface';
import { SkillInterface } from '@models/skill.interface';
import { LanguageInterface } from '@models/interfaces/language.interface';
import { selectLanguages, selectSkills } from '@ourStore/main/main-selectors';
import { getProjectsList } from '@ourStore/projects/projects.actions';
import { projectsListSelector } from '@ourStore/projects/projects.selectors';
import { languagesList, skillsList } from '@ourStore/main/main-actions';

@Component({
  selector: 'app-cv-templates-info',
  templateUrl: './cv-templates-info.component.html',
  styleUrls: ['./cv-templates-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvTemplatesInfoComponent implements OnInit {

  public readonly inputArray = INPUTS;
  public readonly textAreaArray = TEXT_AREAS;

  public name = '';
  public infoForm: FormGroup<CVTemplateInfoForm>;
  public requiredFieldWithLength = REQUIRED__FIELD_WITH_LENGTH;
  public requiredField = REQUIRED_FIELD;
  public projectsList: string[] = [];
  public skillsList: string[] = [];
  public languagesList: string[] = [];
  public storeProjectsList: ProjectsInterface[] = [];
  public storeSkillsList: SkillInterface[] = [];
  public storeLanguagesList: LanguageInterface[] = [];

  public isLoading$: Observable<boolean>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: NonNullableFormBuilder,
    private cdr: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.store.dispatch(getCVById({id: +id}));
    this.getDataForAutocomplete();
    this.defineForm();
    this.getData();
    this.setBreadcrumbs();
  }

  public onSubmit(): void {
    const newCV: CVsSimpleInterface = <CVsSimpleInterface>this.infoForm.value;
    const CVForPost: CVsInterface = {
      ...newCV,
      projects: {
        data: newCV.projects.map((projectName) => {
          const temp = this.storeProjectsList.find((project) => project.name === projectName);
          if (temp) return {
            id: temp.id,
            responsibilities: [],
          };
          return {
            id: 0,
            responsibilities: [],
          };
        }),
      },
      skills: {
        data: {
          ids: newCV.skills.map((skillName) => {
              const temp = this.storeSkillsList.find((skill) => skill.name === skillName);
              if (temp) return temp.id;
              return 0;
            }
          )
        }
      },
      languages: {
        data: {
          ids: newCV.languages.map((languageName) => {
              const temp = this.storeLanguagesList.find((language) => language.name === languageName);
              if (temp) return temp.id;
              return 0;
            }
          )
        }
      }
    };
    this.store.dispatch(updateCV({newCV: CVForPost}));
    this.router.navigate([AppRoutes.MAIN_ROUTE + '/' + AppRoutes.CV_TEMPLATES_ROUTE]);
  }

  private setBreadcrumbs(): void {
    const breadcrumbs: MenuItem[] = [
      { label: MAIN, routerLink: AppRoutes.EMPLOYEES_ROUTE },
      { label: CV_TEMPLATES, routerLink: AppRoutes.CV_TEMPLATES_ROUTE},
      { label: this.name },
    ];
    this.store.dispatch(setBreadcrumbs({breadcrumbs}));
  }

  private getDataForAutocomplete(): void {
    this.store.dispatch(skillsList());
    this.store.select(selectSkills).subscribe((skills: SkillInterface[]) => {
      this.storeSkillsList = skills;
      skills.forEach((skill) => {
        this.skillsList.push(skill.name);
      })
    });
    this.store.dispatch(languagesList());
    this.store.select(selectLanguages).subscribe((languages: LanguageInterface[]) => {
      this.storeLanguagesList = languages;
      languages.forEach((languages) => {
        this.languagesList.push(languages.name);
      })
    });
    this.store.dispatch(getProjectsList());
    this.store.select(projectsListSelector).subscribe((projects: ProjectsInterface[]) => {
      this.storeProjectsList = projects;
      projects.forEach((project) => {
        this.projectsList.push(project.name);
      })
    })
  }

  private getData(): void {
    this.store.select(cvSelector).subscribe((cv) => {
      if (cv) {
        this.name = cv.name;
        this.initializeForm(cv);
      }
    });
    this.isLoading$ = this.store.select(isLoadingCVSelector);
  }

  private initializeForm(cv: CVsInterface): void {
    this.infoForm.patchValue({
      id: cv.id,
      name: cv.name,
      description: cv.description,
      projects: cv.projects.data.map(project =>
         this.storeProjectsList.find(storeProject => storeProject.id === project.id)?.name
      ),
      skills: cv.skills.data.ids.map(skill =>
        this.storeSkillsList.find(storeSkill => storeSkill.id === skill)?.name
      ),
      languages: cv.languages.data.ids.map(language =>
        this.storeLanguagesList.find(storeLanguage => storeLanguage.id === language)?.name
      ),
    });
  }

  private defineForm(): void {
    this.infoForm = this.formBuilder.group<CVTemplateInfoForm>({
      id: this.formBuilder.control(0, []),
      name: this.formBuilder.control('', [Validators.required]),
      description: this.formBuilder.control('', [Validators.required]),
      projects: this.formBuilder.control([], [Validators.required]),
      skills:  this.formBuilder.control([], [Validators.required]),
      languages:  this.formBuilder.control([], [Validators.required]),
    });
  }

}
