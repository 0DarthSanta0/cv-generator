import {Injectable} from '@angular/core';
import {RegisterRequestInterface} from '../../../store/auth/models/register-request.interface';
import {map, Observable} from 'rxjs';
import {CurrentUserInterface} from '../../models/current-user.interface';
import {AuthResponseInterface} from '../../../store/auth/models/auth-response.interface';
import {ApiService} from './api.service';
import {LoginRequestInterface} from '../../../store/auth/models/login-request.interface';
import {EndpointsUrl} from '../../constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  public register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.http.post<AuthResponseInterface>(this.api + EndpointsUrl.REGISTER, data.user).pipe(
        map(this.currentUserMapper)
    );
  }

  public login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    return this.http.post<AuthResponseInterface>(this.api + EndpointsUrl.LOGIN, data.user).pipe(
        map(this.currentUserMapper)
    );
  }

  private currentUserMapper(response: AuthResponseInterface): CurrentUserInterface {
    const user = response.user;
    user.jwt = response.jwt;
    return user;
  }
}