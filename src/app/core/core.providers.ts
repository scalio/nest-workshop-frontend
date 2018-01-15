import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './auth/auth.interceptor';
import { ConfigService } from './config/config.service';
import { environment } from '../../environments/environment';
import { DevelopmentConfigService } from './config/dev-config.service';
import { ProductionConfigService } from './config/prod-config.service';
import { HttpErrorsInterceptor } from './errors/http-errors.interceptor';

export const coreProviders = [
  {
    provide: ConfigService,
    useFactory() {
      return !environment.production
        ? new DevelopmentConfigService()
        : new ProductionConfigService();
    },
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorsInterceptor,
    multi: true,
  },
];
