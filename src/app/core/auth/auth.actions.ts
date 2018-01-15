import { Injectable } from '@angular/core';

import { UserDto } from './dto/user-dto.interface';
import { Action } from '../../store/common/interfaces/action.interface';

@Injectable()
export class AuthActions {
  private static readonly prefix = `[${AuthActions.name}]`;

  static readonly LOGIN = `${AuthActions.prefix} login user`;
  login(userDto: UserDto): Action<UserDto> {
    return {
      type: AuthActions.LOGIN,
      payload: userDto,
    };
  }

  static readonly LOGOUT = `${AuthActions.prefix} logout user`;
  logout(): Action<void> {
    return {
      type: AuthActions.LOGOUT,
    };
  }
}