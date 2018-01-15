import { AppState } from '../../../store/common/interfaces/app-state.interface';
import { createSelector } from '@ngrx/store';
import { selectResources } from './resources.selectors';
import { BuildingsState } from '../interfaces/buildings-state.interface';
import { ResourcesState } from '../interfaces/resources-state.interface';
import { mapValues, map, merge, get } from 'lodash';
import { selectUser } from '../../../store/user/selectors';
import { UserState } from '../../../store/user/interfaces/user-state.interface';
import { Building } from '../../interfaces/building.interface';
import { Resource } from '../../interfaces/resource.interface';

export const selectBuildings = (state: AppState) => state.buildings;

export const mergeBuildingsAndResources = createSelector(
  selectBuildings,
  selectResources,
  (buildings: BuildingsState, resources: ResourcesState) => {
    return map(buildings, item => ({
      ...item,
      resources: (item.resources || []).map(resource =>
        merge(resource, resources[resource.id]),
      ),
    }));
  },
);

export const mergeBuildingsAndAvailability = createSelector(
  mergeBuildingsAndResources,
  selectUser,
  (buildings: Building[], user: UserState) => {
    const isDisabled = (resource: Partial<Resource>) =>
      resource.amount >
      get((user.resources || []).find(res => res.id === resource.id), 'amount');

    const isBuilt = (building: Building) =>
      !!(user.buildings || []).find(item => item === building.id);

    return map(buildings, item =>
      merge(item, {
        isDisabled: (item.resources || []).some(isDisabled),
        isBuilt: isBuilt(item),
      }),
    );
  },
);
