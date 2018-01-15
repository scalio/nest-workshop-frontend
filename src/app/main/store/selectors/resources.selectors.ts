import { AppState } from '../../../store/common/interfaces/app-state.interface';
import { flowRight, values, map, merge } from 'lodash';
import { UserState } from '../../../store/user/interfaces/user-state.interface';
import { ResourcesState } from '../interfaces/resources-state.interface';
import { selectUser } from '../../../store/user/selectors';
import { createSelector } from '@ngrx/store';
import { Resource } from '../../interfaces/resource.interface';

export const selectResources = (state: AppState) => state.resources;
export const selectUserResources = createSelector(
  selectUser,
  selectResources,
  (user: UserState, resources: ResourcesState) => {
    return map(user.resources, (resource) => merge(resource, resources[resource.id]));
  },
);
