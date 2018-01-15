import { BuildingsState } from '../interfaces/buildings-state.interface';
import { Action } from '../../../store/common/interfaces/action.interface';
import { BuildingsActions } from '../../services/buildings.actions';

export function buildingsReducer(
  state: BuildingsState,
  action: Action<any>,
): BuildingsState {
  switch (action.type) {
    case BuildingsActions.UPDATE_ALL: {
      return action.payload;
    }
  }
  return state;
}
