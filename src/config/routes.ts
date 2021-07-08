import { RoutesDataItem, umiRoutes, getNotFoundRoute } from '../utils/routes';

/**
 * User Layout Routing page
 */
import UserLayoutRoutes from '../layouts/UserLayout/routes';

/**
 * Index Layout Routing page
 */
import IndexLayoutRoutes from '../layouts/IndexLayout/routes';

/**
 * config routes Configuration
 * docs: http://admin-antd-react.liqingsong.cc/guide/basis/router-and-menu.html
 */
export const routes: RoutesDataItem[] = [
  {
    title: '',
    path: '/user',
    component: '@/layouts/UserLayout',
    routes: [
      ...umiRoutes(UserLayoutRoutes, '/user', '/user'),
      {
        title: '',
        path: '/user',
        redirect: '/user/login',
      },
      getNotFoundRoute(),
    ],
  },
  {
    title: '',
    path: '/',
    component: '@/layouts/SecurityLayout',
    routes: [
      {
        title: '',
        path: '/',
        component: '@/layouts/IndexLayout',
        routes: [
          ...umiRoutes(IndexLayoutRoutes),
          {
            title: '',
            path: '/',
            redirect: '/home',
          },
          getNotFoundRoute(),
        ],
      },
      getNotFoundRoute(),
    ],
  },
  getNotFoundRoute(),
];
