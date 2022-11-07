import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { deleteProject, getProjectById, updateProject } from '@ourStore/projects/projects.actions';
import {
  ProjectsInterface,
} from '@models/interfaces/no-attributes-projects.interface';
import { isLoadingProjectSelector, projectSelector } from '@ourStore/projects/projects.selectors';
import { AppRoutes } from '@constants/app-routes';
import { ProjectBaseClass } from '@models/classes/project-base.class';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectInfoComponent extends ProjectBaseClass implements OnInit {

  public isLoading$: Observable<boolean>;

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.store.dispatch(getProjectById({id: +id}));
    this.getDataForAutocomplete();
    this.defineForm(0);
    this.getData();
    this.infoForm.valueChanges.subscribe(console.log)
    // this.infoForm.valueChanges.pipe(
    //   map(form => ({
    //     ...form,
    //     to: form.to.to
    //   })),
    // );

  }

  public updateProjectInfo(): void {
    this.store.dispatch(updateProject({newProject: this.getNewProject()}));
    this.router.navigate([AppRoutes.MAIN_ROUTE + '/' + AppRoutes.PROJECTS_ROUTE]);
  }

  public onDelete(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.store.dispatch(deleteProject({id: +id}));
    this.router.navigate([AppRoutes.MAIN_ROUTE + '/' + AppRoutes.PROJECTS_ROUTE]);
  }

  private getData(): void {
    this.store.select(projectSelector).subscribe((project) => {
        if (project) {
          this.setBreadcrumbs(project.name);
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
      from: new Date(project.from),
      to: new Date(project.to),
      skills: project.skills.data.map(skill =>
        skill?.attributes.name
      ),
    });
  }

}
