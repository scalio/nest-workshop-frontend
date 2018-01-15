import { router as rootRouter } from './root/root.controller';
import { router as authRouter } from './auth/auth.controller';
import { router as buildingsRouter } from './buildings/buildings.controller';
import { router as resourcesRouter } from './resources/resources.controller';
import './resources/resources.gateway';

const routes = [
  {
    path: '/auth',
    router: authRouter,
  },
  {
    path: '/resources',
    router: resourcesRouter,
  },
  {
    path: '/buildings',
    router: buildingsRouter,
  }
];

export const useRoutes = server => {
  server.use(rootRouter);
  routes.map(({ path, router }) => server.use(path, router));
};
