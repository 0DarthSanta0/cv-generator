import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { postProject } from '@ourStore/projects/projects.actions';
import { AppRoutes } from '@constants/app-routes';
import { ProjectBaseClass } from '@models/classes/project-base.class';
import { NEW } from '@constants/breadcrumbs';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProjectComponent extends ProjectBaseClass implements OnInit {


  public ngOnInit(): void {
    this.getDataForAutocomplete();
    this.defineForm(Math.round(Math.random()*1000));
    this.setBreadcrumbs(this.translate.instant(NEW));
  }

  public createNewProject(): void {
    this.store.dispatch(postProject({newProject: this.getNewProject()}));
    this.router.navigate([AppRoutes.MAIN_ROUTE + '/' + AppRoutes.PROJECTS_ROUTE]);
  }

}
