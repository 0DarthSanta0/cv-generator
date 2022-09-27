import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { EndpointsUrl } from '../../constants/endpoints';
import { EmployeesResponseInterface } from '../../../store/employees/models/employees-response.interface';
import { EmployeesInterface } from '../../models/employees.interface';
import { EmployeesMapperService } from '../../utils/employees-mapper.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EmployeesService extends ApiService {

    constructor(
        private employeesMapper: EmployeesMapperService,
        override http: HttpClient
    ) {
        super(http);
    }

    public getListEmployees(): Observable<EmployeesInterface[]> {
        return this.http.get<EmployeesResponseInterface[]>(this.api + EndpointsUrl.LIST_EMPLOYEES).pipe(
            map(this.employeesMapper.employeesWithPositionMap)
        )
    }
}
