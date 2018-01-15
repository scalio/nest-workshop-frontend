import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { rootRoutes } from '../../routes';
import { NotificationsService } from '../notifications/notifications.service';
import { PERMISSION_DENIED } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly notificationsService: NotificationsService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    const isAuthenticated = await this.authService.isAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate([rootRoutes.LOGIN]);
      return false;
    }
    return true;
  }
}
