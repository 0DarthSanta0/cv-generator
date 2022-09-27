import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { EndpointsUrl } from '../../constants/endpoints';
import { ApiService } from './api.service';
import { SkillInterface } from '../../models/skill.interface';
import { SkillsListResponseInterface } from '../../../store/employees/models/skills-list-response.interface';
import { EmployeesMapperService } from '../../utils/employees-mapper.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SkillsService extends ApiService {

    constructor(
        private employeesMapper: EmployeesMapperService,
        override http: HttpClient
    ) {
        super(http);
    }

    public getListSkills(): Observable<SkillInterface[]> {
        return this.http.get<SkillsListResponseInterface>(this.api + EndpointsUrl.LIST_SKILLS).pipe(
            map(this.employeesMapper.skillsMap)
        )
    }
}