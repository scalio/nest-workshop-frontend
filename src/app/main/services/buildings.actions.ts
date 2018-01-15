import { Injectable } from '@angular/core';

import { Action } from '../../store/common/interfaces/action.interface';

@Injectable()
export class BuildingsActions {
  private static readonly prefix = `[${BuildingsActions.name}]`;

  static readonly UPDATE_ALL = `${BuildingsActions.prefix} update all`;
  updateAll(buildingsDto): Action<any> {
    return {
      type: BuildingsActions.UPDATE_ALL,
      payload: buildingsDto,
    };
  }
}