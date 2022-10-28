import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DATES, INPUTS, TEXT_AREAS } from '@constants/projects-titles';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ProjectInfoForm } from '@models/interfaces/project-info-form.interface';
import { REQUIRED__FIELD_WITH_LENGTH, REQUIRED_FIELD } from '@constants/validation-errors';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { postProject, updateProject } from '@ourStore/projects/projects.actions';
import {
  ProjectsInterface,
  RequestProjectsInterface,
  SimpleProjectsInterface
} from '@models/interfaces/no-attributes-projects.interface';
import { AppRoutes } from '@constants/app-routes';
import { MenuItem } from 'primeng/api';
import { MAIN, NEW_PROJECT, PROJECTS } from '@constants/breadcrumbs';
import { setBreadcrumbs } from '@ourStore/breadcrumbs/breadcrumbs.actions';
import { SkillInterface } from '@models/skill.interface';
import { selectSkills } from '@ourStore/main/main-selectors';
import { skillsList } from '@ourStore/main/main-actions';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProjectComponent implements OnInit {

  public readonly inputArray = INPUTS;
  public readonly textAreaArray = TEXT_AREAS;
  public readonly dateArray = DATES;

  public infoForm: FormGroup<ProjectInfoForm>;
  public requiredFieldWithLength = REQUIRED__FIELD_WITH_LENGTH;
  public requiredField = REQUIRED_FIELD;
  public skillsList: string[] = [];
  public storeSkillsList: SkillInterface[] = [];

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
    this.store.dispatch(postProject({newProject: projectForPost}));
    this.router.navigate([AppRoutes.MAIN_ROUTE + '/' + AppRoutes.PROJECTS_ROUTE]);
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

  private setBreadcrumbs(): void {
    const breadcrumbs: MenuItem[] = [
      { label: MAIN, routerLink: AppRoutes.EMPLOYEES_ROUTE },
      { label: PROJECTS, routerLink: AppRoutes.PROJECTS_ROUTE},
      { label: NEW_PROJECT, },
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
      skills: this.formBuilder.control([], [Validators.required]),
      from: this.formBuilder.control(null, [Validators.required]),
      to: this.formBuilder.control(null, [Validators.required]),
    });
  }

}
