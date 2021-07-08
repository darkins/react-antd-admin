import { RoutesDataItem } from '@/utils/routes';

/**
 * Index Layout - Routing page
 */
const IndexLayoutRoutes: RoutesDataItem[] = [
  /* {
    icon: 'home',
    title: 'index-layout.menu.home',
    path: '/home',
    component: '@/pages/home',
  }, */
  {
    icon: 'home',
    title: 'index-layout.menu.home',
    path: '/home',
    redirect: '/home/dashboard',
    routes: [
      {
        icon: 'control',
        title: 'index-layout.menu.home.dashboard',
        path: 'dashboard',
        component: '@/pages/home',
      },
    ],
  },
  {
    icon: 'page',
    title: 'index-layout.menu.reliefs',
    path: '/reliefs',
    redirect: '/reliefs/brian/summary',
    routes: [
      {
        icon: 'list',
        title: 'index-layout.menu.reliefs.brian',
        path: 'brian',
        redirect: '/reliefs/brian/summary',
        routes: [
          {
            title: 'index-layout.menu.reliefs.brian.summary',
            path: 'summary',
            component: '@/pages/reliefs/brian/summary',
          },
          {
            title: 'index-layout.menu.reliefs.brian.beneficiaries',
            path: 'beneficiaries',
            component: '@/pages/reliefs/brian/beneficiaries',
          },
          {
            title: 'index-layout.menu.reliefs.brian.assets',
            path: 'assets',
            component: '@/pages/reliefs/brian/assets',
          },
          {
            title: 'index-layout.menu.reliefs.brian.disbursements',
            path: 'disbursements',
            redirect: '/reliefs/brian/disbursements/table',
            routes: [
              {
                title: 'index-layout.menu.reliefs.brian.disbursements.table',
                path: 'table',
                component: '@/pages/reliefs/brian/disbursements/table',
              },
              {
                title: 'index-layout.menu.reliefs.brian.disbursements.pro-table',
                path: 'protable',
                component: '@/pages/reliefs/brian/disbursements/pro-table',
              },
            ],
          },
        ],
      },
      {
        icon: 'edit',
        title: 'index-layout.menu.reliefs.form',
        path: 'form',
        redirect: '/reliefs/form/basic',
        routes: [
          {
            title: 'index-layout.menu.reliefs.form.basic',
            path: 'basic',
            component: '@/pages/reliefs/form/basic',
          },
          {
            title: 'index-layout.menu.reliefs.form.complex',
            path: 'complex',
            component: '@/pages/reliefs/form/complex',
          },
        ],
      },
      {
        icon: 'detail',
        title: 'index-layout.menu.reliefs.detail',
        path: 'detail',
        redirect: '/reliefs/detail/basic',
        routes: [
          {
            title: 'index-layout.menu.reliefs.detail.basic',
            path: 'basic',
            component: '@/pages/reliefs/detail/basic',
          },
          {
            title: 'index-layout.menu.reliefs.detail.module',
            path: 'module',
            component: '@/pages/reliefs/detail/module',
          },
          {
            title: 'index-layout.menu.reliefs.detail.table',
            path: 'table',
            component: '@/pages/reliefs/detail/table',
          },
        ],
      },
    ],
  },
  {
    icon: 'page',
    title: 'index-layout.menu.reports',
    path: '/reports/hurricanes',
    redirect: '/reports/hurricanes/john',
    routes: [
      {
        icon: 'control',
        title: 'index-layout.menu.reports.hurricanes',
        path: 'john',
        redirect: '/reports/hurricanes/john',
        routes: [
          {
            title: 'index-layout.menu.reports.hurricanes.john',
            path: 'john',
            component: '@/pages/reports/hurricanes/john',
          },
          {
            title: 'index-layout.menu.reports.hurricanes.paul',
            path: 'paul',
            component: '@/pages/reports/hurricanes/paul',
          },
          {
            title: 'index-layout.menu.reports.hurricanes.george',
            path: 'george',
            component: '@/pages/reports/hurricanes/george',
          },
          {
            title: 'index-layout.menu.reports.hurricanes.ringo',
            path: 'ringo',
            component: '@/pages/reports/hurricanes/ringo',
          },
        ]
      },

    ],
  },
  {
    icon: 'permissions',
    title: 'index-layout.menu.settings',
    path: '/roles',
    redirect: '/roles/all',
    routes: [
      {
        icon: 'detail',
        title: 'index-layout.menu.settings.all',
        path: 'all',
        component: '@/pages/roles/all',
      },
      {
        icon: 'detail',
        roles: ['user'],
        title: 'index-layout.menu.settings.user',
        path: 'user',
        component: '@/pages/roles/user',
      },
      {
        icon: 'detail',
        roles: ['test'],
        title: 'index-layout.menu.settings.test',
        path: 'test',
        component: '@/pages/roles/test',
      },
    ],
  },
];

export default IndexLayoutRoutes;
