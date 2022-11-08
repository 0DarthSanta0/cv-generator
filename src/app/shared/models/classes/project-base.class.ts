import { DATES, INPUTS, TEXT_AREAS } from '@constants/projects-titles';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ProjectInfoForm } from '@models/interfaces/project-info-form.interface';
import { REQUIRED__FIELD_WITH_LENGTH, REQUIRED_FIELD } from '@constants/validation-errors';
import { SkillInterface } from '@models/skill.interface';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { DateProjectsInterface, SimpleProjectsInterface } from '@models/interfaces/no-attributes-projects.interface';
import { AppRoutes } from '@constants/app-routes';
import { selectSkills } from '@ourStore/main/main-selectors';
import { MenuItem } from 'primeng/api';
import { MAIN, PROJECTS } from '@constants/breadcrumbs';
import { setBreadcrumbs } from '@ourStore/breadcrumbs/breadcrumbs.actions';
import { skillsList } from '@ourStore/main/main-actions';
import { Directive } from '@angular/core';
import { CustomDateValidators } from '../../validators/date-picker-validator';
import { TranslateService } from '@ngx-translate/core';

@Directive()
export class ProjectBaseClass {
  public readonly inputArray = INPUTS;
  public readonly textAreaArray = TEXT_AREAS;
  public readonly dateArray = DATES;

  public infoForm: FormGroup<ProjectInfoForm>;
  public requiredFieldWithLength = REQUIRED__FIELD_WITH_LENGTH;
  public requiredField = REQUIRED_FIELD;
  public skillsList: string[] = [];
  public storeSkillsList: SkillInterface[] = [];

  constructor(
    protected store: Store,
    protected route: ActivatedRoute,
    protected formBuilder: NonNullableFormBuilder,
    protected router: Router,
    protected translate: TranslateService,
  ) { }

  protected getNewProject(): SimpleProjectsInterface {
    const newProject: DateProjectsInterface = <DateProjectsInterface>this.infoForm.value;
    const filteredList = this.storeSkillsList.filter((skill) => newProject.skills.includes(skill.name));
    return  {
      ...newProject,
      from: newProject.from.toISOString().split('T')[0],
      to: newProject.to.toISOString().split('T')[0],
      skills: filteredList.map((skill) => skill.id  ),
    };
  }

  protected getDataForAutocomplete(): void {
    this.store.dispatch(skillsList());
    this.store.select(selectSkills).subscribe((skills: SkillInterface[]) => {
      this.storeSkillsList = skills;
      this.skillsList = skills.map((skill) => skill.name);
    });
  }

  protected setBreadcrumbs(name: string): void {
    const breadcrumbs: MenuItem[] = [
      { label: this.translate.instant(MAIN)  },
      { label: this.translate.instant(PROJECTS), routerLink: AppRoutes.PROJECTS_ROUTE},
      { label: name, },
    ];
    this.store.dispatch(setBreadcrumbs({breadcrumbs}));
  }

  protected defineForm(id: number): void {
    this.infoForm = this.formBuilder.group<ProjectInfoForm>({
      id: this.formBuilder.control(id, []),
      name: this.formBuilder.control('', [Validators.required]),
      domain: this.formBuilder.control('', [Validators.required]),
      internalName: this.formBuilder.control('', [Validators.required]),
      description: this.formBuilder.control('', [Validators.required]),
      skills: this.formBuilder.control([], [Validators.required]),
      from: this.formBuilder.control(null, [Validators.required]),
      to: this.formBuilder.control(null, [Validators.required]),
    },{
      validators: [
        CustomDateValidators.fromToDate('from', 'to')
      ]
    });
  }
}
