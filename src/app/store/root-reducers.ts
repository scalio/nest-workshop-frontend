import { userReducer } from './user/reducer';
import { buildingsReducer } from '../main/store/reducers/buildings.reducer';
import { resourcesReducer } from '../main/store/reducers/resources.reducer';

export const rootReducers: any = {
  user: userReducer,
  buildings: buildingsReducer,
  resources: resourcesReducer,
};