import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EndpointsUrl } from '@constants/endpoints';
import { ApiService } from './api.service';
import { SkillInterface } from '@models/skill.interface';
import { EmployeesMapperService } from '@utils/employees-mapper.service';
import { JsonDataWithAttributes, JsonResponse } from '@models/interfaces/json-data-response.interface';

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
        return this.httpService.get<JsonResponse<JsonDataWithAttributes[]>>(this.api + EndpointsUrl.LIST_SKILLS).pipe(
            map(this.employeesMapper.responseMap)
        )
    }
}