import { ResourcesState } from '../interfaces/resources-state.interface';
import { Action } from '../../../store/common/interfaces/action.interface';
import { ResourcesActions } from '../../services/resources.actions';

export function resourcesReducer(
  state: ResourcesState,
  action: Action<any>,
): ResourcesState {
  switch (action.type) {
    case ResourcesActions.UPDATE_ALL: {
      return action.payload;
    }
  }
  return state;
}
