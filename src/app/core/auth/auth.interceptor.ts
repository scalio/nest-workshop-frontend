import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LocalStorageService } from '../storage/local-storage.service';
import { USER_TOKEN_KEY } from '../constants';
import { AuthTokenDto } from './dto/auth-token-dto.interface';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly localStorageService: LocalStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!this.localStorageService.hasKey(USER_TOKEN_KEY)) {
      return next.handle(req);
    }
    const { access_token } = this.localStorageService.getObject<AuthTokenDto>(
      USER_TOKEN_KEY,
    );
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${access_token}`),
    });
    return next.handle(authReq);
  }
}
