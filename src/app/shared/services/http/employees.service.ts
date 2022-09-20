import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeesInterface } from '../../models/interfaces/employees.interface';
import { ApiService } from './api.service';
import { EndpointsUrl } from '../../constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends ApiService{

  public getListEmployees(): Observable<EmployeesInterface[]> {
    return this.http.get<EmployeesInterface[]>(this.api + EndpointsUrl.LIST_EMPLOYEES);
  }
}
