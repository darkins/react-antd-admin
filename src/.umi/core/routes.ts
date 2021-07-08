// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from 'C:/work/Aid-Tech/te2-prototype/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/PageLoading/index';

export function getRoutes() {
  const routes = [
  {
    "title": "",
    "path": "/user",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'@/layouts/UserLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "title": "user-layout.menu.login",
        "path": "/user/login",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__login' */'@/pages/user/login'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "title": "user-layout.menu.register",
        "path": "/user/register",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__register' */'@/pages/user/register'), loading: LoadingComponent}),
        "exact": true
      },
      {
        "title": "",
        "path": "/user",
        "redirect": "/user/login",
        "exact": true
      },
      {
        "hidden": true,
        "title": "",
        "path": "/user/*",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'@/pages/404'), loading: LoadingComponent}),
        "exact": true
      }
    ]
  },
  {
    "title": "",
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SecurityLayout' */'@/layouts/SecurityLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "title": "",
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__IndexLayout' */'@/layouts/IndexLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "icon": "home",
            "title": "index-layout.menu.home",
            "path": "/home",
            "routes": [
              {
                "icon": "control",
                "title": "index-layout.menu.home.dashboard",
                "path": "/home/dashboard",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__home' */'@/pages/home'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "hidden": true,
                "title": "index-layout.menu.home",
                "path": "/home",
                "redirect": "/home/dashboard",
                "exact": true
              },
              {
                "hidden": true,
                "title": "",
                "path": "/home/*",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'@/pages/404'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "icon": "page",
            "title": "index-layout.menu.reliefs",
            "path": "/reliefs",
            "routes": [
              {
                "icon": "list",
                "title": "index-layout.menu.reliefs.brian",
                "path": "/reliefs/brian",
                "routes": [
                  {
                    "title": "index-layout.menu.reliefs.brian.summary",
                    "path": "/reliefs/brian/summary",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__reliefs__brian__summary' */'@/pages/reliefs/brian/summary'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "title": "index-layout.menu.reliefs.brian.beneficiaries",
                    "path": "/reliefs/brian/beneficiaries",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__reliefs__brian__beneficiaries' */'@/pages/reliefs/brian/beneficiaries'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "title": "index-layout.menu.reliefs.brian.assets",
                    "path": "/reliefs/brian/assets",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__reliefs__brian__assets' */'@/pages/reliefs/brian/assets'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "title": "index-layout.menu.reliefs.brian.disbursements",
                    "path": "/reliefs/brian/disbursements",
                    "routes": [
                      {
                        "title": "index-layout.menu.reliefs.brian.disbursements.table",
                        "path": "/reliefs/brian/disbursements/table",
                        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__reliefs__brian__disbursements__table' */'@/pages/reliefs/brian/disbursements/table'), loading: LoadingComponent}),
                        "exact": true
                      },
                      {
                        "title": "index-layout.menu.reliefs.brian.disbursements.pro-table",
                        "path": "/reliefs/brian/disbursements/protable",
                        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__reliefs__brian__disbursements__pro-table' */'@/pages/reliefs/brian/disbursements/pro-table'), loading: LoadingComponent}),
                        "exact": true
                      },
                      {
                        "hidden": true,
                        "title": "index-layout.menu.reliefs.brian.disbursements",
                        "path": "/reliefs/brian/disbursements",
                        "redirect": "/reliefs/brian/disbursements/table",
                        "exact": true
                      },
                      {
                        "hidden": true,
                        "title": "",
                        "path": "/reliefs/brian/disbursements/*",
                        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'@/pages/404'), loading: LoadingComponent}),
                        "exact": true
                      }
                    ]
                  },
                  {
                    "hidden": true,
                    "title": "index-layout.menu.reliefs.brian",
                    "path": "/reliefs/brian",
                    "redirect": "/reliefs/brian/summary",
                    "exact": true
                  },
                  {
                    "hidden": true,
                    "title": "",
                    "path": "/reliefs/brian/*",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'@/pages/404'), loading: LoadingComponent}),
                    "exact": true
                  }
                ]
              },
              {
                "icon": "edit",
                "title": "index-layout.menu.reliefs.form",
                "path": "/reliefs/form",
                "routes": [
                  {
                    "title": "index-layout.menu.reliefs.form.basic",
                    "path": "/reliefs/form/basic",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__reliefs__form__basic' */'@/pages/reliefs/form/basic'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "title": "index-layout.menu.reliefs.form.complex",
                    "path": "/reliefs/form/complex",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__reliefs__form__complex' */'@/pages/reliefs/form/complex'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "hidden": true,
                    "title": "index-layout.menu.reliefs.form",
                    "path": "/reliefs/form",
                    "redirect": "/reliefs/form/basic",
                    "exact": true
                  },
                  {
                    "hidden": true,
                    "title": "",
                    "path": "/reliefs/form/*",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'@/pages/404'), loading: LoadingComponent}),
                    "exact": true
                  }
                ]
              },
              {
                "icon": "detail",
                "title": "index-layout.menu.reliefs.detail",
                "path": "/reliefs/detail",
                "routes": [
                  {
                    "title": "index-layout.menu.reliefs.detail.basic",
                    "path": "/reliefs/detail/basic",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__reliefs__detail__basic' */'@/pages/reliefs/detail/basic'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "title": "index-layout.menu.reliefs.detail.module",
                    "path": "/reliefs/detail/module",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__reliefs__detail__module' */'@/pages/reliefs/detail/module'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "title": "index-layout.menu.reliefs.detail.table",
                    "path": "/reliefs/detail/table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__reliefs__detail__table' */'@/pages/reliefs/detail/table'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "hidden": true,
                    "title": "index-layout.menu.reliefs.detail",
                    "path": "/reliefs/detail",
                    "redirect": "/reliefs/detail/basic",
                    "exact": true
                  },
                  {
                    "hidden": true,
                    "title": "",
                    "path": "/reliefs/detail/*",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'@/pages/404'), loading: LoadingComponent}),
                    "exact": true
                  }
                ]
              },
              {
                "hidden": true,
                "title": "index-layout.menu.reliefs",
                "path": "/reliefs",
                "redirect": "/reliefs/brian/summary",
                "exact": true
              },
              {
                "hidden": true,
                "title": "",
                "path": "/reliefs/*",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'@/pages/404'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "icon": "page",
            "title": "index-layout.menu.reports",
            "path": "/reports/hurricanes",
            "routes": [
              {
                "icon": "control",
                "title": "index-layout.menu.reports.hurricanes",
                "path": "/reports/hurricanes/john",
                "routes": [
                  {
                    "title": "index-layout.menu.reports.hurricanes.john",
                    "path": "/reports/hurricanes/john/john",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__reports__hurricanes__john' */'@/pages/reports/hurricanes/john'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "title": "index-layout.menu.reports.hurricanes.paul",
                    "path": "/reports/hurricanes/john/paul",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__reports__hurricanes__paul' */'@/pages/reports/hurricanes/paul'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "title": "index-layout.menu.reports.hurricanes.george",
                    "path": "/reports/hurricanes/john/george",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__reports__hurricanes__george' */'@/pages/reports/hurricanes/george'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "title": "index-layout.menu.reports.hurricanes.ringo",
                    "path": "/reports/hurricanes/john/ringo",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__reports__hurricanes__ringo' */'@/pages/reports/hurricanes/ringo'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "hidden": true,
                    "title": "index-layout.menu.reports.hurricanes",
                    "path": "/reports/hurricanes/john",
                    "redirect": "/reports/hurricanes/john",
                    "exact": true
                  },
                  {
                    "hidden": true,
                    "title": "",
                    "path": "/reports/hurricanes/john/*",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'@/pages/404'), loading: LoadingComponent}),
                    "exact": true
                  }
                ]
              },
              {
                "hidden": true,
                "title": "index-layout.menu.reports",
                "path": "/reports/hurricanes",
                "redirect": "/reports/hurricanes/john",
                "exact": true
              },
              {
                "hidden": true,
                "title": "",
                "path": "/reports/hurricanes/*",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'@/pages/404'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "icon": "permissions",
            "title": "index-layout.menu.settings",
            "path": "/roles",
            "routes": [
              {
                "icon": "detail",
                "title": "index-layout.menu.settings.all",
                "path": "/roles/all",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__roles__all' */'@/pages/roles/all'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "icon": "detail",
                "roles": [
                  "user"
                ],
                "title": "index-layout.menu.settings.user",
                "path": "/roles/user",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__roles__user' */'@/pages/roles/user'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "icon": "detail",
                "roles": [
                  "test"
                ],
                "title": "index-layout.menu.settings.test",
                "path": "/roles/test",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__roles__test' */'@/pages/roles/test'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "hidden": true,
                "title": "index-layout.menu.settings",
                "path": "/roles",
                "redirect": "/roles/all",
                "exact": true
              },
              {
                "hidden": true,
                "title": "",
                "path": "/roles/*",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'@/pages/404'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "title": "",
            "path": "/",
            "redirect": "/home",
            "exact": true
          },
          {
            "hidden": true,
            "title": "",
            "path": "/*",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'@/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "hidden": true,
        "title": "",
        "path": "/*",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'@/pages/404'), loading: LoadingComponent}),
        "exact": true
      }
    ]
  },
  {
    "hidden": true,
    "title": "",
    "path": "/*",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'@/pages/404'), loading: LoadingComponent}),
    "exact": true
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
