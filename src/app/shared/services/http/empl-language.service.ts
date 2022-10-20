import { Injectable } from '@angular/core';
import { ApiService } from '@services/http/api.service';
import { LanguageInterface } from '@models/interfaces/language.interface';
import { map, Observable } from 'rxjs';
import { EndpointsUrl } from '@constants/endpoints';
import { JsonAttribute, JsonDataWithAttributes, JsonResponse } from '@models/interfaces/json-data-response.interface';
import { EmployeesMapperService } from '@services/employees-mapper.service';

@Injectable({
    providedIn: 'root'
})
export class EmplLanguageService extends ApiService {
    constructor(
        private employeesMapper: EmployeesMapperService,
    ) {
        super();
    }

    public getListLanguage(): Observable<LanguageInterface[]> {
        return this.httpService.get<JsonResponse<JsonDataWithAttributes<JsonAttribute>[]>>(this.api + EndpointsUrl.LIST_LANGUAGES).pipe(
            map(this.employeesMapper.responseMap)
        )
    }
}
