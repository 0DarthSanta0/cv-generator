import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppRoutes } from '@constants/app-routes';
import { COLUMNS_NAMES } from '@constants/projects-titles';
import { getProjectsList } from '@ourStore/projects/projects.actions';
import { isLoadingProjectSelector, projectsListSelector } from '@ourStore/projects/projects.selectors';
import { ProjectsInterface } from '@models/interfaces/no-attributes-projects.interface';
import { setBreadcrumbs } from '@ourStore/breadcrumbs/breadcrumbs.actions';
import { MenuItem } from 'primeng/api';
import { MAIN, PROJECTS } from '@constants/breadcrumbs';
import { NEW_PROJECT } from '@constants/projects-routes';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListComponent implements OnInit {

  public isLoading$: Observable<boolean>;
  public projects$: Observable<ProjectsInterface[]>;

  public columnNames: string[] = COLUMNS_NAMES;

  constructor(
    private store: Store,
    private router: Router,
  ) {
  }

  public ngOnInit(): void {
    this.setBreadcrumbs();
    this.selectProjects();
  }

  public navigateToInfoPage(id: string): void {
    this.router.navigate([AppRoutes.MAIN_ROUTE + '/' + AppRoutes.PROJECTS_ROUTE, id]);
  }

  public navigateToNewProjectPage(): void {
    this.router.navigate([AppRoutes.MAIN_ROUTE + '/' + AppRoutes.PROJECTS_ROUTE + '/' + NEW_PROJECT]);
  }

  private setBreadcrumbs(): void {
    const breadcrumbs: MenuItem[] = [
      {label: MAIN, routerLink: AppRoutes.EMPLOYEES_ROUTE},
      {label: PROJECTS, routerLink: AppRoutes.PROJECTS_ROUTE},
    ];
    this.store.dispatch(setBreadcrumbs({breadcrumbs}));
  }

  private selectProjects(): void {
    this.store.dispatch(getProjectsList());
    this.projects$ = this.store.pipe(
      select(projectsListSelector),
      map(projects => [...projects])
    );
    this.isLoading$ = this.store.select(isLoadingProjectSelector);
  }

}
