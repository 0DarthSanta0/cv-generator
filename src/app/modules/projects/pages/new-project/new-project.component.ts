import { Component, OnInit } from '@angular/core';
import { DATES, INPUTS, TEXT_AREAS } from '@constants/projects-titles';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ProjectInfoForm } from '@models/interfaces/project-info-form.interface';
import { REQUIRED__FIELD_WITH_LENGTH, REQUIRED_FIELD } from '@constants/validation-errors';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { postProject } from '@ourStore/projects/projects.actions';
import { ProjectsInterface } from '@models/interfaces/no-attributes-projects.interface';
import { AppRoutes } from '@constants/app-routes';
import { MenuItem } from 'primeng/api';
import { MAIN, NEW, PROJECTS } from '@constants/breadcrumbs';
import { setBreadcrumbs } from '@ourStore/breadcrumbs/breadcrumbs.actions';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  public readonly inputArray = INPUTS;
  public readonly textAreaArray = TEXT_AREAS;
  public readonly dateArray = DATES;

  public infoForm: FormGroup<ProjectInfoForm>;
  public requiredFieldWithLength = REQUIRED__FIELD_WITH_LENGTH;
  public requiredField = REQUIRED_FIELD;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.defineForm();
    this.setBreadcrumbs();
  }

  public onSubmit(): void {
    const newProject: ProjectsInterface = <ProjectsInterface>this.infoForm.value;
    this.store.dispatch(postProject({newProject}));
    this.router.navigate([AppRoutes.PROJECT_ROUTE]);
  }

  private setBreadcrumbs(): void {
    const breadcrumbs: MenuItem[] = [
      { label: MAIN, routerLink: AppRoutes.EMPLOYEES_ROUTE },
      { label: PROJECTS, routerLink: AppRoutes.PROJECT_ROUTE},
      { label: NEW, },
    ];
    this.store.dispatch(setBreadcrumbs({breadcrumbs}));
  }

  private defineForm(): void {
    this.infoForm = this.formBuilder.group<ProjectInfoForm>({
      id: this.formBuilder.control(Math.round(Math.random()*1000), []),
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
