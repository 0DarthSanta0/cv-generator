import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
  deleteProject,
  deleteProjectFail,
  deleteProjectSuccess,
  getProjectById,
  getProjectByIdFail,
  getProjectByIdSuccess,
  getProjectsList,
  getProjectsListFail,
  getProjectsListSuccess,
  postProject,
  postProjectFail,
  postProjectSuccess,
  updateProject,
  updateProjectFail,
  updateProjectSuccess
} from '@ourStore/projects/projects.actions';
import { ProjectsService } from '@services/http/projects.service';
import { Injectable } from '@angular/core';
import {
  PROJECT_DELETE_FAILURE,
  PROJECT_DELETE_SUCCESS,
  PROJECT_POST_FAILURE,
  PROJECT_POST_SUCCESS,
  PROJECT_UPDATE_FAILURE,
  PROJECT_UPDATE_SUCCESS
} from '@constants/toast-messages';
import { MessageService } from 'primeng/api';

@Injectable()
export class ProjectsEffects {

  public projectsList$ = createEffect(() => this.actions$.pipe(
    ofType(getProjectsList),
    switchMap(() => this.projectsService.getProjectsList()),
    map((projectsList) => getProjectsListSuccess({projectsList})),
    catchError((errorResponse: HttpErrorResponse) => of(getProjectsListFail({errors: errorResponse.error})))
  ));

  public projectsById$ = createEffect(() => this.actions$.pipe(
    ofType(getProjectById),
    switchMap(({id}) => this.projectsService.getProjectById(id)),
    map((project) => getProjectByIdSuccess({project})),
    catchError((errorResponse: HttpErrorResponse) => of(getProjectByIdFail({errors: errorResponse.error})))
  ));

  public updateProject$ = createEffect(() => this.actions$.pipe(
    ofType(updateProject),
    switchMap(({newProject}) => this.projectsService.updateProject(newProject)),
    map(() => {
        this.messageService.add({severity: 'success', summary: PROJECT_UPDATE_SUCCESS});
        return updateProjectSuccess()
      }
    ),
    catchError((errorResponse: HttpErrorResponse) => {
        this.messageService.add({severity: 'error', summary: PROJECT_UPDATE_FAILURE});
        return of(updateProjectFail({errors: errorResponse.error}))
      }
    )
  ));

  public postProject$ = createEffect(() => this.actions$.pipe(
    ofType(postProject),
    switchMap(({newProject}) => this.projectsService.postProject(newProject)),
    map(() => {
        this.messageService.add({severity: 'success', summary: PROJECT_POST_SUCCESS});
        return postProjectSuccess()
      }
    ),
    catchError((errorResponse: HttpErrorResponse) => {
        this.messageService.add({severity: 'error', summary: PROJECT_POST_FAILURE});
        return of(postProjectFail({errors: errorResponse.error}))
      }
    )
  ));

  public deleteProject$ = createEffect(() => this.actions$.pipe(
    ofType(deleteProject),
    switchMap(({id}) => this.projectsService.deleteProject(id)),
    map(() => {
        this.messageService.add({severity: 'success', summary: PROJECT_DELETE_SUCCESS});
        return deleteProjectSuccess()
      }
    ),
    catchError((errorResponse: HttpErrorResponse) => {
        this.messageService.add({severity: 'error', summary: PROJECT_DELETE_FAILURE});
        return of(deleteProjectFail({errors: errorResponse.error}))
      }
    )
  ));

  constructor(
    private actions$: Actions,
    private store: Store,
    private projectsService: ProjectsService,
    private messageService: MessageService
  ) {
  }
}
