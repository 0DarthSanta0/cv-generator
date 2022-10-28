import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { REQUIRED__FIELD_WITH_LENGTH, REQUIRED_FIELD } from '@constants/validation-errors';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from '@constants/app-routes';
import { MenuItem } from 'primeng/api';
import { CV_TEMPLATES, MAIN, NEW_CVS } from '@constants/breadcrumbs';
import { CVTemplateInfoForm } from '@models/interfaces/cv-template-info-form.interface';
import { CVsInterface, CVsSimpleInterface } from '@models/interfaces/cvs.interface';
import { postCV } from '@ourStore/cvs/cvs.actions';
import { setBreadcrumbs } from '@ourStore/breadcrumbs/breadcrumbs.actions';
import { AUTO_COMPLETE_AREAS, INPUTS, TEXT_AREAS } from '@constants/cvs-titles';
import { languagesList, skillsList } from '@ourStore/main/main-actions';
import { selectLanguages, selectSkills } from '@ourStore/main/main-selectors';
import { SkillInterface } from '@models/skill.interface';
import { LanguageInterface } from '@models/interfaces/language.interface';
import { projectsListSelector } from '@ourStore/projects/projects.selectors';
import { getProjectsList } from '@ourStore/projects/projects.actions';
import { ProjectsInterface } from '@models/interfaces/no-attributes-projects.interface';

@Component({
  selector: 'app-new-cv-template',
  templateUrl: './new-cv-template.component.html',
  styleUrls: ['./new-cv-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewCvTemplateComponent implements OnInit {

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
    private store: Store,
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.getDataForAutocomplete();
    this.defineForm();
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
    this.store.dispatch(postCV({newCV: CVForPost}));
    this.router.navigate([AppRoutes.MAIN_ROUTE + '/' + AppRoutes.CV_TEMPLATES_ROUTE]);
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

  private setBreadcrumbs(): void {
    const breadcrumbs: MenuItem[] = [
      { label: MAIN, routerLink: AppRoutes.EMPLOYEES_ROUTE },
      { label: CV_TEMPLATES, routerLink: AppRoutes.CV_TEMPLATES_ROUTE},
      { label: NEW_CVS, },
    ];
    this.store.dispatch(setBreadcrumbs({breadcrumbs}));
  }

  private defineForm(): void {
    this.infoForm = this.formBuilder.group<CVTemplateInfoForm>({
      id: this.formBuilder.control(Math.round(Math.random()*1000), []),
      name: this.formBuilder.control('', [Validators.required]),
      description: this.formBuilder.control('', [Validators.required]),
      projects: this.formBuilder.control([], [Validators.required]),
      skills:  this.formBuilder.control([], [Validators.required]),
      languages:  this.formBuilder.control([], [Validators.required]),
    });
  }
}
