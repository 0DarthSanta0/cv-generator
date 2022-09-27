import {Injectable} from '@angular/core';
import {RegisterRequestInterface} from '../../../store/auth/models/register-request.interface';
import {map, Observable} from 'rxjs';
import {UserInterface} from '../../models/user.interface';
import {AuthResponseInterface} from '../../../store/auth/models/auth-response.interface';
import {ApiService} from './api.service';
import {LoginRequestInterface} from '../../../store/auth/models/login-request.interface';
import {EndpointsUrl} from '../../constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  public register(data: RegisterRequestInterface): Observable<UserInterface> {
    return this.http.post<AuthResponseInterface>(this.api + EndpointsUrl.REGISTER, data.user).pipe(
        map(this.getUser)
    );
  }

  public login(data: LoginRequestInterface): Observable<UserInterface> {
    return this.http.post<AuthResponseInterface>(this.api + EndpointsUrl.LOGIN, data.user).pipe(
        map(this.getUser)
    );
  }

  public getCurrentUser(): Observable<UserInterface> {
    return this.http.get<UserInterface>(this.api + EndpointsUrl.CURRENT_USER)
  }

  private getUser(response: AuthResponseInterface): UserInterface {
    const user = response.user;
    user.jwt = response.jwt;
    return user;
  }
}