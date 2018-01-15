import { AppState } from './common/interfaces/app-state.interface';

type Partial<T> = {
    [P in keyof T]?: T[P];
};

export const rootInitialState: Partial<AppState> = {};