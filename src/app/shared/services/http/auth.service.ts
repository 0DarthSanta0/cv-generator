import {Injectable} from '@angular/core';
import {RegisterRequestInterface} from "../../../store/auth/models/register-request.interface";
import {map, Observable} from "rxjs";
import {CurrentUserInterface} from "../../models/current-user.interface";
import {AuthResponseInterface} from "../../../store/auth/models/auth-response.interface";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  private endpoints = {
    register: '/auth/local/register',
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.http.post<AuthResponseInterface>(this.api + this.endpoints.register, data.user).pipe(
        map((response: AuthResponseInterface) => {
              let user = response.user;
              user.jwt = response.jwt
              return user;
            }
        )
    )
  }
}
