import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { SharedModule } from '../shared/shared.module';
import { MainPageComponent } from './main-page.component';
import { BuildingComponent } from './building/building.component';
import { BuildingsService } from './services/buildings.service';
import { ResourcesService } from './services/resources.service';
import { ResourcesActions } from './services/resources.actions';
import { BuildingsActions } from './services/buildings.actions';
import { ResourcesResolver } from './resolvers/resources.resolver';
import { BuildingsResolver } from './resolvers/buildings.resolver';
import { ResourcesGateway } from './services/resources.gateway';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    SocketIoModule,
  ],
  declarations: [MainPageComponent, BuildingComponent],
  providers: [
    ResourcesService,
    BuildingsService,
    ResourcesActions,
    BuildingsActions,
    ResourcesResolver,
    BuildingsResolver,
    ResourcesGateway,
  ],
})
export class MainModule {}
