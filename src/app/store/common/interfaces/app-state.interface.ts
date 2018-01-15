import { UserState } from '../../user/interfaces/user-state.interface';
import { ResourcesState } from '../../../main/store/interfaces/resources-state.interface';
import { BuildingsState } from '../../../main/store/interfaces/buildings-state.interface';

export interface AppState {
  user: UserState;
  resources: ResourcesState;
  buildings: BuildingsState;
}
