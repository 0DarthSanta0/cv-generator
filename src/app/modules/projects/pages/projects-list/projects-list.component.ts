import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppRoutes } from '@constants/app-routes';
import { isLoadingSelector } from '@ourStore/employees/employees.selectors';
import { COLUMNS_NAMES } from '@constants/projects-titles';
import { getProjectsList } from '@ourStore/projects/projects.actions';
import { projectsListSelector } from '@ourStore/projects/projects.selectors';
import { ProjectsInterface } from '@models/interfaces/no-attributes-projects.interface';

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
  ) { }

  public redirectToProjectsInfo(id: string): void {
    this.router.navigate([AppRoutes.EMPLOYEES_ROUTE, id]);
  }

  public ngOnInit(): void {
    this.selectProjects();
  }


  private selectProjects(): void {
    this.store.dispatch(getProjectsList());
    this.projects$ = this.store.select(projectsListSelector);
    this.isLoading$ = this.store.select(isLoadingSelector);
  }

}
