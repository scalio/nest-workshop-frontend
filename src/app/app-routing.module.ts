import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthGuard } from './core/auth/auth.guard';
import { environment } from '../environments/environment';
import { rootRoutes } from './routes';
import { MainPageComponent } from './main/main-page.component';
import { LoginComponent } from './login/login/login.component';
import { ResourcesResolver } from './main/resolvers/resources.resolver';
import { BuildingsResolver } from './main/resolvers/buildings.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: rootRoutes.MAIN,
        component: MainPageComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
        resolve: {
          resources: ResourcesResolver,
          buildings: BuildingsResolver,
        },
      },
      {
        path: rootRoutes.LOGIN,
        component: LoginComponent,
      }
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      enableTracing: !environment.production,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
