import { Injectable } from '@angular/core';
import { ConfigService } from '../../core/config/config.service';
import { AppState } from '../../store/common/interfaces/app-state.interface';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { Resource } from '../interfaces/resource.interface';
import { Observable } from 'rxjs/Observable';
import { ResourcesGateway } from './resources.gateway';

@Injectable()
export class ResourcesService {
  constructor(
    private readonly store: Store<AppState>,
    private readonly httpClient: HttpClient,
    private readonly configService: ConfigService,
    private readonly resourcesGateway: ResourcesGateway,
  ) {
    this.resourcesGateway.start();
  }

  fetchAll(): Observable<Resource[]> {
    const url = `${this.configService.API_URL}/resources`;
    return this.httpClient
      .get<ApiResponse<Resource[]>>(url)
      .pluck<ApiResponse<Resource[]>, Resource[]>('data');
  }
}
