import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EndpointsUrl } from '../../constants/endpoints';
import { ApiService } from './api.service';
import { SkillInterface } from '../../models/skill.interface';
import { SkillResponseInterface } from '../../../store/employees/models/skill-response.interface';

@Injectable({
    providedIn: 'root'
})
export class SkillsService extends ApiService {

    public getListSkills(): Observable<SkillInterface[]> {
        return this.http.get<SkillResponseInterface>(this.api + EndpointsUrl.LIST_SKILLS).pipe(
            map((item) =>
                item.data.map((item) => item).reduce((acc: SkillInterface[], skill) => (
                    [...acc,
                        {
                            id: skill.id,
                            name: skill.attributes.name
                        }
                    ]
                ), [])
            ),
        )
    }
}
