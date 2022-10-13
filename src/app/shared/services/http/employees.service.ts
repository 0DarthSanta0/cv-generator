import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { EndpointsUrl } from '@constants/endpoints';
import { EmployeesResponseInterface } from '@ourStore/employees/models/employees-response.interface';
import { EmployeesInterface } from '@models/employees.interface';
import { EmployeesMapperService } from '@services/employees-mapper.service';

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
            map(this.employeesMapper.getEmployeesWithPositionMap)
        )
    }

    public getEmployeeById(id: number): Observable<EmployeesInterface> {
        return this.httpService.get<EmployeesResponseInterface>(this.api + '/users/' + id + '?populate=position').pipe(
            map(employee => {
                return {
                    ...employee,
                    position: employee.position.name
                }
            })
        )
    }

    public updateEmployee(dataEmployee: EmployeesInterface): Observable<EmployeesInterface> {
        return this.httpService.put<EmployeesInterface>(this.api + EndpointsUrl.USERS_UPDATE + dataEmployee.id, dataEmployee);
    }
}
