import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { isNil } from 'lodash';

import { AppState } from '../../store/common/interfaces/app-state.interface';
import { ConfigService } from '../config/config.service';
import { selectUser } from '../../store/user/selectors';
import { AuthTokenDto } from './dto/auth-token-dto.interface';
import { LocalStorageService } from '../storage/local-storage.service';
import { USER_TOKEN_KEY } from '../constants';
import { UserDto } from './dto/user-dto.interface';
import { AuthActions } from './auth.actions';
import { rootRoutes } from '../../routes';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { LoginUserDto } from './dto/login-user-dto.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly store: Store<AppState>,
    private readonly httpClient: HttpClient,
    private readonly configService: ConfigService,
    private readonly localStorageService: LocalStorageService,
    private readonly authActions: AuthActions,
    private readonly router: Router,
  ) {}

  login(loginUserDto: LoginUserDto): Observable<UserDto> {
    const url = `${this.configService.API_URL}/auth/token`;

    return this.httpClient
      .post<ApiResponse<AuthTokenDto>>(url, loginUserDto)
      .switchMap((authTokenDto: ApiResponse<AuthTokenDto>) => {
        const { data } = authTokenDto;
        this.storeTokenInMemory(data);
        return this.fetchUserDetails();
      });
  }

  logout() {
    this.store.dispatch(this.authActions.logout());
    this.localStorageService.removeItem(USER_TOKEN_KEY);
    this.router.navigate([rootRoutes.LOGIN]);
  }

  fetchUserDetails(): Observable<UserDto> {
    const url = `${this.configService.API_URL}/me`;
    return this.httpClient
      .get<ApiResponse<UserDto>>(url)
      .pluck<ApiResponse<UserDto>, UserDto>('data')
      .do((userDto: UserDto) => {
        this.store.dispatch(this.authActions.login(userDto));
        this.router.navigate([rootRoutes.MAIN]);
      });
  }

  async isAuthenticated(): Promise<boolean> {
    const isAuthenticated = await this.store
      .select(selectUser)
      .map(user => !isNil(user))
      .take(1)
      .toPromise();
    if (isAuthenticated) {
      return true;
    }
    const isAuthenticatedInMemory = await this.isAuthenticatedInMemory();
    return isAuthenticatedInMemory
      ? this.fetchUserDetails()
          .switchMap(userDto => Observable.of(true))
          .catch(() => Observable.of(false))
          .toPromise()
      : false;
  }

  async isAuthenticatedInMemory(): Promise<boolean> {
    const token = this.localStorageService.getObject<{
      access_token: string;
      expires: number;
    }>(USER_TOKEN_KEY);
    return token.access_token ? await this.validateToken(token) : false;
  }

  storeTokenInMemory(data: AuthTokenDto) {
    const { access_token, expires_in } = data;
    const expires = Date.now() + expires_in * 1000;
    this.localStorageService.setObject(USER_TOKEN_KEY, { access_token, expires });
  }

  async validateToken(token: {
    access_token: string;
    expires: number;
  }): Promise<boolean> {
    const { expires } = token;
    return expires > new Date().getTime();
  }
}
