import { NgModule } from '@angular/core';

import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { LocalStorageService } from './storage/local-storage.service';
import { AuthActions } from './auth/auth.actions';
import { NotificationsService } from './notifications/notifications.service';
import { coreProviders } from './core.providers';
import { LoggerService } from './logger/logger.service';

@NgModule({
  imports: [],
  providers: [
    LoggerService,
    AuthGuard,
    AuthService,
    LocalStorageService,
    NotificationsService,
    AuthActions,
    ...coreProviders,
  ],
  exports: [],
})
export class CoreModule {}
