import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { REQUIRED__FIELD_WITH_LENGTH, REQUIRED_FIELD } from '@constants/validation-errors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { DATES, INPUTS, TEXT_AREAS } from '@constants/projects-titles';
import { ProjectInfoForm } from '@models/interfaces/project-info-form.interface';
import { getProjectById, updateProject } from '@ourStore/projects/projects.actions';
import { ProjectsInterface } from '@models/interfaces/no-attributes-projects.interface';
import { isLoadingProjectSelector, projectSelector } from '@ourStore/projects/projects.selectors';
import { AppRoutes } from '@constants/app-routes';
import { MenuItem } from 'primeng/api';
import { MAIN, PROJECTS } from '@constants/breadcrumbs';
import { setBreadcrumbs } from '@ourStore/breadcrumbs/breadcrumbs.actions';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent implements OnInit {

  public readonly inputArray = INPUTS;
  public readonly textAreaArray = TEXT_AREAS;
  public readonly dateArray = DATES;

  public name = '';
  public infoForm: FormGroup<ProjectInfoForm>;
  public requiredFieldWithLength = REQUIRED__FIELD_WITH_LENGTH;
  public requiredField = REQUIRED_FIELD;

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
    this.defineForm();
    this.getData();
    this.setBreadcrumbs();
  }

  public onSubmit(): void {
    const newProject: ProjectsInterface = <ProjectsInterface>this.infoForm.value;
    this.store.dispatch(updateProject({newProject}));
    this.router.navigate([AppRoutes.PROJECT_ROUTE]);
  }

  private setBreadcrumbs(): void {
    const breadcrumbs: MenuItem[] = [
      { label: MAIN, routerLink: AppRoutes.EMPLOYEES_ROUTE },
      { label: PROJECTS, routerLink: AppRoutes.PROJECT_ROUTE},
      { label: this.name },
    ];
    this.store.dispatch(setBreadcrumbs({breadcrumbs}));
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
    });
  }

  private defineForm(): void {
    this.infoForm = this.formBuilder.group<ProjectInfoForm>({
      id: this.formBuilder.control(0, []),
      name: this.formBuilder.control('', [Validators.required]),
      domain: this.formBuilder.control('', [Validators.required]),
      internalName: this.formBuilder.control('', [Validators.required]),
      description: this.formBuilder.control('', [Validators.required]),
      skills: this.formBuilder.array([]),
      from: this.formBuilder.control(null, [Validators.required]),
      to: this.formBuilder.control(null, [Validators.required]),
    });
  }
}
