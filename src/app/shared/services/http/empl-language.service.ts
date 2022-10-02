import { Injectable } from '@angular/core';
import { ApiService } from '@services/http/api.service';
import { LanguageInterface } from '@models/interfaces/language.interface';
import { map, Observable } from 'rxjs';
import { LanguageResponseInterface } from '@ourStore/employees/models/language-response.interface';
import { EndpointsUrl } from '@constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class EmplLanguageService extends ApiService{

  public getListLanguage(): Observable<LanguageInterface[]> {
    return this.httpService.get<LanguageResponseInterface>(this.api + EndpointsUrl.LIST_LANGUAGES).pipe(
        map((item) =>
            item.data.map((item) => item).reduce((acc: LanguageInterface[], skill) => (
                [...acc,
                  {
                    id: skill.id,
                    name: skill.attributes.name,

                  }
                ]
            ), [])
        )
    )
  }
}
