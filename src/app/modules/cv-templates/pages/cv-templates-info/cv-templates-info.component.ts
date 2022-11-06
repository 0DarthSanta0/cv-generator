import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppRoutes } from '@constants/app-routes';
import { deleteCV, getCVById, updateCV } from '@ourStore/cvs/cvs.actions';
import { CVsInterface, } from '@models/interfaces/cvs.interface';
import { cvSelector, isLoadingCVSelector } from '@ourStore/cvs/cvs.selectors';
import { BaseCvTemplate } from '@models/classes/cv-template-base.class';

@Component({
  selector: 'app-cv-templates-info',
  templateUrl: './cv-templates-info.component.html',
  styleUrls: ['./cv-templates-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvTemplatesInfoComponent extends BaseCvTemplate implements OnInit {

  public isLoading$: Observable<boolean>;

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.store.dispatch(getCVById({id: +id}));
    this.getDataForAutocomplete();
    this.defineForm(0);
    this.getData();
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
        this.setBreadcrumbs(cv.name);
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
