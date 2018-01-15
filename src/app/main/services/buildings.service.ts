import { Injectable } from '@angular/core';
import { ConfigService } from '../../core/config/config.service';
import { AppState } from '../../store/common/interfaces/app-state.interface';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Building } from '../interfaces/building.interface';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../core/auth/auth.service';

@Injectable()
export class BuildingsService {
  constructor(
    private readonly store: Store<AppState>,
    private readonly httpClient: HttpClient,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  fetchAll(): Observable<Building[]> {
    const url = `${this.configService.API_URL}/buildings`;
    return this.httpClient
      .get<ApiResponse<Building[]>>(url)
      .pluck<ApiResponse<Building[]>, Building[]>('data');
  }

  buildById(id: number): Observable<any> {
    const url = `${this.configService.API_URL}/me/buildings`;
    return this.httpClient
      .post(url, { id })
      .switchMap(() => this.authService.fetchUserDetails());
  }
}
