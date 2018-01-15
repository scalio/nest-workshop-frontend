import { Resource } from './resource.interface';

export interface Building {
  id: number;
  name: string;
  resources: Partial<Resource>[];
}
