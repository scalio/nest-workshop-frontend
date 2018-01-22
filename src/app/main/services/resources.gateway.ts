import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { AuthTokenDto } from '../../core/auth/dto/auth-token-dto.interface';
import { LocalStorageService } from '../../core/storage/local-storage.service';
import { USER_TOKEN_KEY } from '../../core/constants';
import { NotificationsService } from '../../core/notifications/notifications.service';
import { AuthService } from '../../core/auth/auth.service';

@Injectable()
export class ResourcesGateway extends Socket {
  constructor(
    localStorageService: LocalStorageService,
    private readonly notificationsService: NotificationsService,
    private readonly authService: AuthService,
  ) {
    super({
      url: 'ws://localhost:8080',
      options: {
        query: localStorageService.getObject<AuthTokenDto>(USER_TOKEN_KEY),
      },
    });
  }

  start() {
    this.subscribeConnection();
    this.subscribeMessages();
    this.connect();
  }

  subscribeConnection() {
    this.once('connect', () => this.emit('start'));
  }

  subscribeMessages() {
    this.fromEvent<any>('resource')
      .do(data =>
        this.notificationsService.success(
          'Resource',
          `You found ${data.value} ${data.name}!`,
        ),
      )
      .switchMap(() => this.authService.fetchUserDetails())
      .publish()
      .connect();
  }
}
