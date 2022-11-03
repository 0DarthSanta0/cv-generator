import { Injectable } from '@angular/core';
import { ApiService } from '@services/http/api.service';
import { map, Observable } from 'rxjs';
import { EndpointsUrl } from '@constants/endpoints';
import { ResponseProjectInterface } from '@models/interfaces/project.interface';
import { ProjectsInterface, SimpleProjectsInterface } from '@models/interfaces/no-attributes-projects.interface';
import { JsonResponse } from '@models/interfaces/json-data-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends ApiService {

  constructor() {
    super();
  }

  public getProjectsList(): Observable<ProjectsInterface[]> {
    return this.httpService.get<JsonResponse<ResponseProjectInterface[]>>(this.api + EndpointsUrl.LIST_PROJECTS).pipe(
      map((projectsList): ProjectsInterface[] =>
        projectsList.data.map((project): ProjectsInterface => {
          return {
            id: project.id,
            ...project.attributes,
          };
        })
      ),
    );
  }

  public getProjectById(id: number): Observable<ProjectsInterface> {
    return this.httpService.get<JsonResponse<ResponseProjectInterface>>(this.api + '/projects/' + id + '?populate=skills').pipe(
      map((project): ProjectsInterface => ({
        id: project.data.id,
        ...project.data.attributes,
      })),
    );
  }

  public updateProject(project: SimpleProjectsInterface): Observable<SimpleProjectsInterface> {
    return this.httpService.put<SimpleProjectsInterface>(this.api + EndpointsUrl.PROJECTS + project.id, {
      data: project,
    });
  }

  public postProject(project: SimpleProjectsInterface): Observable<SimpleProjectsInterface> {
    return this.httpService.post<SimpleProjectsInterface>(this.api + EndpointsUrl.PROJECTS, {
      data: project,
    });
  }

  public deleteProject(id: number): Observable<SimpleProjectsInterface> {
    return this.httpService.delete<SimpleProjectsInterface>(this.api + EndpointsUrl.PROJECTS + id);
  }

}
