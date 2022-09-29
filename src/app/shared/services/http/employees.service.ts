import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { EndpointsUrl } from '@constants/endpoints';
import { EmployeesResponseInterface } from '@ourStore/employees/models/employees-response.interface';
import { EmployeesInterface } from '@models/employees.interface';
import { EmployeesMapperService } from '@utils/employees-mapper.service';

@Injectable({
    providedIn: 'root'
})
export class EmployeesService extends ApiService {

    constructor(
        private employeesMapper: EmployeesMapperService,
    ) {
        super();
    }

    public getListEmployees(): Observable<EmployeesInterface[]> {
        return this.httpService.get<EmployeesResponseInterface[]>(this.api + EndpointsUrl.LIST_EMPLOYEES).pipe(
            map(this.employeesMapper.employeesWithPositionMap)
        )
    }
}
