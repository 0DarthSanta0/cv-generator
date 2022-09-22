import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { EndpointsUrl } from '../../constants/endpoints';
import { EmployeesResponseInterface } from '../../../store/employees/models/employees-response.interface';
import { EmployeesInterface } from '../../models/employees.interface';

@Injectable({
    providedIn: 'root'
})
export class EmployeesService extends ApiService {

    public getListEmployees(): Observable<EmployeesInterface[]> {
        return this.http.get<EmployeesResponseInterface[]>(this.api + EndpointsUrl.LIST_EMPLOYEES).pipe(
            map((employees) =>
                employees.map((employee) => {
                    const position = employee.position;
                    return {
                        ...employee,
                        position: position.name
                    }
                })
            )
        )
    }
}
