import { Injectable } from '@angular/core';

import { Action } from '../../store/common/interfaces/action.interface';

@Injectable()
export class ResourcesActions {
  private static readonly prefix = `[${ResourcesActions.name}]`;

  static readonly UPDATE_ALL = `${ResourcesActions.prefix} update all`;
  updateAll(resourcesDto): Action<any> {
    return {
      type: ResourcesActions.UPDATE_ALL,
      payload: resourcesDto,
    };
  }
}