import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PositionInterface } from '@models/interfaces/position.interface';
import { ApiService } from '@services/http/api.service';
import { EndpointsUrl } from '@constants/endpoints';
import { EmployeesMapperService } from '@services/employees-mapper.service';
import { JsonAttribute, JsonDataWithAttributes, JsonResponse } from '@models/interfaces/json-data-response.interface';

@Injectable({
    providedIn: 'root'
})
export class PositionService extends ApiService {

    constructor(
        private employeesMapper: EmployeesMapperService,
    ) {
        super();
    }

    public getListPositions(): Observable<PositionInterface[]> {
        return this.httpService.get<JsonResponse<JsonDataWithAttributes<JsonAttribute>[]>>(this.api + EndpointsUrl.LIST_POSITIONS).pipe(
            map(this.employeesMapper.responseMap)
        )
    }
}
