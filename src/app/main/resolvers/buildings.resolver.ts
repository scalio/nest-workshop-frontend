import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BuildingsService } from '../services/buildings.service';
import { AppState } from '../../store/common/interfaces/app-state.interface';
import { Store } from '@ngrx/store';
import { BuildingsActions } from '../services/buildings.actions';

@Injectable()
export class BuildingsResolver implements Resolve<null> {
  constructor(
    private readonly buildingsService: BuildingsService,
    private readonly store: Store<AppState>,
    private readonly buildingsActions: BuildingsActions,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<null> {
    return this.buildingsService
      .fetchAll()
      .do(buildingsDto => {
        const action = this.buildingsActions.updateAll(buildingsDto);
        this.store.dispatch(action);
      })
      .map(_ => null)
      .catch((e) => Observable.of(null));
  }
}
