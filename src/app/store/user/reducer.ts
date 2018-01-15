import { Action } from '../common/interfaces/action.interface';
import { UserDto } from '../../core/auth/dto/user-dto.interface';
import { UserState } from './interfaces/user-state.interface';
import { AuthActions } from '../../core/auth/auth.actions';

export function userReducer(state: UserState, action: Action<any>): UserState {
  switch (action.type) {
    case AuthActions.LOGIN: {
      return action.payload as UserDto;
    }
  }
  return state;
}