import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
  getProjectById, getProjectByIdFail, getProjectByIdSuccess,
  getProjectsList,
  getProjectsListFail,
  getProjectsListSuccess, postProject, updateProject, updateProjectFail, updateProjectSuccess
} from '@ourStore/projects/projects.actions';
import { ProjectsService } from '@services/http/projects.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectsEffects {

  constructor(
    private actions$: Actions,
    private store: Store,
    private projectsService: ProjectsService,
  ) { }

  public projectsList$ = createEffect(() => this.actions$.pipe(
    ofType(getProjectsList),
    switchMap(() => {
      return this.projectsService.getProjectsList();
    }),
    map((projectsList) =>
      getProjectsListSuccess({ projectsList })
    ),
    catchError((errorResponse: HttpErrorResponse) =>
      of(getProjectsListFail({ errors: errorResponse.error }))
    )
  ));

  public projectsById$ = createEffect(() => this.actions$.pipe(
    ofType(getProjectById),
    switchMap(({id}) => {
      return this.projectsService.getProjectById(id);
    }),
    map((project) =>
      getProjectByIdSuccess({ project })
    ),
    catchError((errorResponse: HttpErrorResponse) =>
      of(getProjectByIdFail({ errors: errorResponse.error }))
    )
  ));

  public updateProject$ = createEffect(() => this.actions$.pipe(
    ofType(updateProject),
    switchMap(({newProject}) => {
      return this.projectsService.updateProject(newProject);
    }),
    map(() =>
      updateProjectSuccess()
    ),
    catchError((errorResponse: HttpErrorResponse) =>
      of(updateProjectFail({ errors: errorResponse.error }))
    )
  ));

  public postProject$ = createEffect(() => this.actions$.pipe(
    ofType(postProject),
    switchMap(({newProject}) => {
      return this.projectsService.postProject(newProject);
    }),
    map(() =>
      updateProjectSuccess()
    ),
    catchError((errorResponse: HttpErrorResponse) =>
      of(updateProjectFail({ errors: errorResponse.error }))
    )
  ));

}
