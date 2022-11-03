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
import { deleteCV, getCVById, updateCV } from '@ourStore/cvs/cvs.actions';
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
import { CvTemplateBaseClass } from '@models/classes/cv-template-base.class';

@Component({
  selector: 'app-cv-templates-info',
  templateUrl: './cv-templates-info.component.html',
  styleUrls: ['./cv-templates-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvTemplatesInfoComponent extends CvTemplateBaseClass implements OnInit {

  public name = '';

  public isLoading$: Observable<boolean>;

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.store.dispatch(getCVById({id: +id}));
    this.getDataForAutocomplete();
    this.defineForm(0);
    this.getData();
    this.setBreadcrumbs(this.name);
  }

  public onSubmit(): void {
    this.store.dispatch(updateCV({newCV: this.getNewCVTemplate()}));
    this.router.navigate([AppRoutes.MAIN_ROUTE + '/' + AppRoutes.CV_TEMPLATES_ROUTE]);
  }

  public onDelete(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.store.dispatch(deleteCV({id: +id}));
    this.router.navigate([AppRoutes.MAIN_ROUTE + '/' + AppRoutes.CV_TEMPLATES_ROUTE]);
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
    const projectsIds = cv.projects.data.map(project => project.id);
    this.infoForm.patchValue({
      id: cv.id,
      name: cv.name,
      description: cv.description,
      skills: this.storeSkillsList.filter(skill => cv.skills.data.ids.includes(skill.id)).map(skill => skill.name),
      languages: this.storeLanguagesList.filter(language => cv.languages.data.ids.includes(language.id)).map(language => language.name),
      projects: this.storeProjectsList.filter(project => projectsIds.includes(project.id)).map(project => project.name),
    });
  }

}
