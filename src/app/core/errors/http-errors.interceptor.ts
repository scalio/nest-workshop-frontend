import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';

import { NotificationsService } from '../notifications/notifications.service';
import { INVALID_REQUEST } from '../constants';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
  constructor(private readonly notificationsService: NotificationsService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).catch((response: HttpErrorResponse) => {
      const message = this.pluckMessage(response);
      this.notificationsService.error(message || INVALID_REQUEST);
      return Observable.throw(response);
    });
  }

  pluckMessage(response: HttpErrorResponse): string | null {
    if (!response || !response.error) {
      return null;
    }
    try {
      const { message } = JSON.parse(response.error);
      return message;
    } catch (e) {
      return null;
    }
  }
}
