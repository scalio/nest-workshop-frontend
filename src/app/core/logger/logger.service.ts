import { Injectable } from '@angular/core';

import { ConfigService } from './../config/config.service';
import { DevelopmentConfigService } from '../config/dev-config.service';

@Injectable()
export class LoggerService {
  constructor(private readonly configService: ConfigService) {}

  get info() {
    return this.getLogger(console.info.bind(console));
  }

  get warn() {
    return this.getLogger(console.warn.bind(console));
  }

  get error() {
    return this.getLogger(console.error.bind(console));
  }

  private getLogger(fn) {
    if (this.configService instanceof DevelopmentConfigService) {
      return fn;
    }
    return () => undefined;
  }
}