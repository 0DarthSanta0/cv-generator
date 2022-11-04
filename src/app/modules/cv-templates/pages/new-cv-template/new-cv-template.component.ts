import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppRoutes } from '@constants/app-routes';
import { NEW_CVS } from '@constants/breadcrumbs';
import { postCV } from '@ourStore/cvs/cvs.actions';
import { BaseCvTemplate } from '@models/classes/cv-template-base.class';

@Component({
  selector: 'app-new-cv-template',
  templateUrl: './new-cv-template.component.html',
  styleUrls: ['./new-cv-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewCvTemplateComponent extends BaseCvTemplate implements OnInit {

  public ngOnInit(): void {
    this.getDataForAutocomplete();
    this.defineForm(Math.round(Math.random()*1000));
    this.setBreadcrumbs(NEW_CVS);
  }

  public onSubmit(): void {
    console.log(this.getNewCVTemplate())
    this.store.dispatch(postCV({newCV: this.getNewCVTemplate()}));
    this.router.navigate([AppRoutes.MAIN_ROUTE + '/' + AppRoutes.CV_TEMPLATES_ROUTE]);
  }

}
