import { AppState } from '../common/interfaces/app-state.interface';

export const selectUser = (state: AppState) => state.user;