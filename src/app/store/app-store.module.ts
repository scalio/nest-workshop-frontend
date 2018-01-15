import { NgModule } from '@angular/core';
import { StoreModule, combineReducers, compose } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { rootReducers } from './root-reducers';
import { rootInitialState } from './initial-state';
import { AppState } from './common/interfaces/app-state.interface';
import { rootEffects } from './root-effects';

const options = {
  initialState: rootInitialState,
};

@NgModule({
  imports: [
    StoreModule.forRoot<AppState>(rootReducers, options),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    EffectsModule.forRoot(rootEffects),
  ],
  exports: [StoreModule, EffectsModule],
})
export class AppStoreModule {}
