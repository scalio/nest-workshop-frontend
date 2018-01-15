import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ResourcesService } from '../services/resources.service';
import { AppState } from '../../store/common/interfaces/app-state.interface';
import { Store } from '@ngrx/store';
import { ResourcesActions } from '../services/resources.actions';

@Injectable()
export class ResourcesResolver implements Resolve<null> {
  constructor(
    private readonly resourcesService: ResourcesService,
    private readonly store: Store<AppState>,
    private readonly resourcesActions: ResourcesActions,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<null> {
    return this.resourcesService
      .fetchAll()
      .do(resourcesDto => {
        const action = this.resourcesActions.updateAll(resourcesDto);
        this.store.dispatch(action);
      })
      .map(_ => null)
      .catch((e) => Observable.of(null));
  }
}
