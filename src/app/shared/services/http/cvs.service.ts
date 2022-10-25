import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { JsonResponse } from '@models/interfaces/json-data-response.interface';
import { EndpointsUrl } from '@constants/endpoints';
import { ApiService } from '@services/http/api.service';
import { CVsInterface } from '@models/interfaces/cvs.interface';
import { ResponseCVsInterface } from '@models/interfaces/response.cvs.interface';

@Injectable({
  providedIn: 'root'
})
export class CvsService extends ApiService{

  constructor() {
    super();
  }

  public getCVsList(): Observable<CVsInterface[]> {
    return this.httpService.get<JsonResponse<ResponseCVsInterface[]>>(this.api + EndpointsUrl.LIST_CVS).pipe(
      map((cvsList): CVsInterface[] =>
        cvsList.data.map((cv): CVsInterface => {
          return {
            id: cv.id,
            ...cv.attributes,
          };
        })
      ),
    );
  }

  public getCVById(id: number): Observable<CVsInterface> {
    return this.httpService.get<JsonResponse<ResponseCVsInterface>>(this.api + EndpointsUrl.LIST_CVS + '/' + id).pipe(
      map((cv): CVsInterface => ({
        id: cv.data.id,
        ...cv.data.attributes,
      })),
    );
  }

  public updateCV(cv: CVsInterface): Observable<CVsInterface> {
    return this.httpService.put<CVsInterface>(this.api + EndpointsUrl.LIST_CVS + '/' + cv.id, {
      data: cv,
    });
  }

  public postCV(cv: CVsInterface): Observable<CVsInterface> {
    return this.httpService.post<CVsInterface>(this.api + EndpointsUrl.LIST_CVS, {
      data: cv,
    });
  }
}
