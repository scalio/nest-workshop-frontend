import { ConfigService } from './config.service';

export class ProductionConfigService extends ConfigService {
  readonly API_URL = 'http://localhost:3000';
}