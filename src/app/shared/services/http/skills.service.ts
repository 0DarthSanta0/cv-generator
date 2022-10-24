import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EndpointsUrl } from '@constants/endpoints';
import { ApiService } from './api.service';
import { SkillInterface } from '@models/skill.interface';
import { EmployeesMapperService } from '@services/employees-mapper.service';
import { JsonAttribute, JsonDataWithAttributes, JsonResponse } from '@models/interfaces/json-data-response.interface';
import { IEntityRequest } from '@ourStore/entities/models/entity-request.interface';

@Injectable({
  providedIn: 'root'
})
export class SkillsService extends ApiService {

  constructor(
    private employeesMapper: EmployeesMapperService,
  ) {
    super();
  }

  public getListSkills(): Observable<SkillInterface[]> {
    return this.httpService.get<JsonResponse<JsonDataWithAttributes<JsonAttribute>[]>>(this.api + EndpointsUrl.LIST_SKILLS).pipe(
      map(this.employeesMapper.responseMap)
    )
  }

  public deleteSkill(id: number): Observable<JsonResponse<JsonDataWithAttributes<JsonAttribute>[]>> {
    return this.httpService.delete<JsonResponse<JsonDataWithAttributes<JsonAttribute>[]>>(this.api + EndpointsUrl.LIST_SKILLS + '/' + id);
  }

  public addSkill(name: string): Observable<JsonResponse<JsonDataWithAttributes<JsonAttribute>[]>> {
    const newEntity: IEntityRequest = {
      data: {
        name: name
      }
    };
    return this.httpService.post<JsonResponse<JsonDataWithAttributes<JsonAttribute>[]>>(this.api + EndpointsUrl.LIST_SKILLS, newEntity)
  }
}