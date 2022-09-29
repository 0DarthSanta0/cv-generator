import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  protected api: string = environment.api;

  constructor(
      protected http: HttpClient
  ) {
  }

}
