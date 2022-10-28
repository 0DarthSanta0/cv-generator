import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { REQUIRED__FIELD_WITH_LENGTH, REQUIRED_FIELD } from '@constants/validation-errors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { DATES, INPUTS, TEXT_AREAS } from '@constants/projects-titles';
import { ProjectInfoForm } from '@models/interfaces/project-info-form.interface';
import { getProjectById, updateProject } from '@ourStore/projects/projects.actions';
import {
  ProjectsInterface,
  RequestProjectsInterface,
  SimpleProjectsInterface
} from '@models/interfaces/no-attributes-projects.interface';
import { isLoadingProjectSelector, projectSelector } from '@ourStore/projects/projects.selectors';
import { AppRoutes } from '@constants/app-routes';
import { MenuItem } from 'primeng/api';
import { MAIN, PROJECTS } from '@constants/breadcrumbs';
import { setBreadcrumbs } from '@ourStore/breadcrumbs/breadcrumbs.actions';
import { SkillInterface } from '@models/skill.interface';
import { selectSkills } from '@ourStore/main/main-selectors';
import { skillsList } from '@ourStore/main/main-actions';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectInfoComponent implements OnInit {

  public readonly inputArray = INPUTS;
  public readonly textAreaArray = TEXT_AREAS;
  public readonly dateArray = DATES;

  public name = '';
  public infoForm: FormGroup<ProjectInfoForm>;
  public requiredFieldWithLength = REQUIRED__FIELD_WITH_LENGTH;
  public requiredField = REQUIRED_FIELD;
  public skillsList: string[] = [];
  public storeSkillsList: SkillInterface[] = [];

  public isLoading$: Observable<boolean>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: NonNullableFormBuilder,
  ) { }

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.store.dispatch(getProjectById({id: +id}));
    this.getDataForAutocomplete();
    this.defineForm();
    this.getData();
    this.setBreadcrumbs();
  }

  public onSubmit(): void {
    const newProject: SimpleProjectsInterface = <SimpleProjectsInterface>this.infoForm.value;
    const projectForPost: RequestProjectsInterface = {
      ...newProject,
      skills: newProject.skills.map((skillName) => {
          const temp = this.storeSkillsList.find((skill) => skill.name === skillName);
          if (temp) return temp.id;
          return 0;
        }
      )
    };
    this.store.dispatch(updateProject({newProject: projectForPost}));
    this.router.navigate([AppRoutes.MAIN_ROUTE + '/' + AppRoutes.PROJECTS_ROUTE]);
  }

  private setBreadcrumbs(): void {
    const breadcrumbs: MenuItem[] = [
      { label: MAIN, routerLink: AppRoutes.EMPLOYEES_ROUTE },
      { label: PROJECTS, routerLink: AppRoutes.PROJECTS_ROUTE},
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
  }

  private getData(): void {
    this.store.select(projectSelector).subscribe((project) => {
        if (project) {
          this.name = project.name;
          this.initializeForm(project);
        }
    });
    this.isLoading$ = this.store.select(isLoadingProjectSelector);
  }

  private initializeForm(project: ProjectsInterface): void {
    this.infoForm.patchValue({
      id: project.id,
      name: project.name,
      domain: project.domain,
      internalName: project.internalName,
      description: project.description,
      from: project.from,
      to: project.to,
      skills: project.skills.data.map(skill =>
        skill?.attributes.name
      ),
    });
  }

  private defineForm(): void {
    this.infoForm = this.formBuilder.group<ProjectInfoForm>({
      id: this.formBuilder.control(0, []),
      name: this.formBuilder.control('', [Validators.required]),
      domain: this.formBuilder.control('', [Validators.required]),
      internalName: this.formBuilder.control('', [Validators.required]),
      description: this.formBuilder.control('', [Validators.required]),
      skills: this.formBuilder.control([], [Validators.required]),
      from: this.formBuilder.control(null, [Validators.required]),
      to: this.formBuilder.control(null, [Validators.required]),
    });
  }
}
