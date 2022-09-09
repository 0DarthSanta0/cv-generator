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
        map(this.getUser)
    );
  }

  public login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    return this.http.post<AuthResponseInterface>(this.api + EndpointsUrl.LOGIN, data.user).pipe(
        map(this.getUser)
    );
  }

  public getCurrentUser(): Observable<CurrentUserInterface> {
    return this.http.get<CurrentUserInterface>(this.api + EndpointsUrl.CURRENT_USER)
  }

  private getUser(response: AuthResponseInterface): CurrentUserInterface {
    const user = response.user;
    user.jwt = response.jwt;
    return user;
  }
}