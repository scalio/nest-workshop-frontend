import { Resource } from '../../interfaces/resource.interface';

export interface ResourcesState {
  [id: number]: Resource;
}
