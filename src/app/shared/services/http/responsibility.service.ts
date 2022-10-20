import { Injectable } from '@angular/core';
import { ApiService } from '@services/http/api.service';
import { EmployeesMapperService } from '@services/employees-mapper.service';
import { map, Observable } from 'rxjs';
import { JsonAttribute, JsonDataWithAttributes, JsonResponse } from '@models/interfaces/json-data-response.interface';
import { EndpointsUrl } from '@constants/endpoints';
import { IResponsibility } from '@models/interfaces/responsibility.interface';

@Injectable({
  providedIn: 'root'
})
export class ResponsibilityService extends ApiService{

  constructor(
    private employeesMapper: EmployeesMapperService,
  ) {
    super();
  }

  public getResponsibilities(): Observable<IResponsibility[]> {
    return this.httpService.get<JsonResponse<JsonDataWithAttributes<JsonAttribute>[]>>(this.api + EndpointsUrl.LIST_RESPONSIBILITIES).pipe(
      map(this.employeesMapper.responseMap)
    )
  }
}
