import settings from '../config/settings';
import { isExternal } from './validate';

/**
 * Routing type
 */
export interface RoutesDataItem {
  // Whether the menu is hidden
  hidden?: boolean;
  // The name of the icon, displayed before the menu title
  icon?: string;
  // Permission control, page roles (you can set multiple roles)
  roles?: string[];
  // Title, route the text displayed in the menu, browser title or breadcrumbs, currently available locales
  title: string;
  // Routing address or external link
  path: string;
  // Jump address
  redirect?: string;
  // Component page
  component?: string;
  // Child collection
  routes?: RoutesDataItem[];
  /**
   * Breadcrumb custom content：
   *     1、The default is not configured to automatically read according to the route；
   *     2、Set to false, Automatically read according to the route and do not read the current self；
   *     3、The breadcrumb format corresponding to the configuration is as follows：
   */
  breadcrumb?: RoutesDataItem[] | false;
  /**
   * Select the left menu, if you set the path, the sidebar will highlight the sidebar navigation corresponding to the path you set
   *   1、（Default route.path），This parameter is to meet the special needs of special pages，
   *   2、For example: select the sidebar navigation on the details page or the page under module A, and want to select module B as the navigation selected state
   */
  selectLeftMenu?: string;
  /**
   * Belonging to the top-level menu, when the top-level menu exists, it is used to select the top menu and switch with the sidebar menu
   *   1、The function of this parameter of three-level routing is to select the top-level menu
   *   2、The function of this parameter of the second level route is to belong to a top-level menu. The two levels must be filled in at the same time. If the path is set to an external link, this parameter is required.
   *   3、(Not set by default path.split('/')[0])，This parameter is to meet the special needs of special pages
   */
  belongTopMenu?: string;
}

/**
 * Obtain route
 * @param pathname path
 * @param routesData routes
 */
export const getRouteItem = (
  pathname: string,
  routesData: RoutesDataItem[],
): RoutesDataItem => {
  let item: RoutesDataItem = { title: '', path: '' };
  for (let index = 0, len = routesData.length; index < len; index += 1) {
    const element = routesData[index];
    if (element.path === pathname) {
      item = element;
      break;
    }

    if (element.routes) {
      item = getRouteItem(pathname, element.routes);
      if (item.path !== '') {
        break;
      }
    }
  }

  return item;
};

/**
 * Get parent route
 * @param pathname path
 * @param routesData routes
 */
export const getRouteParentItem = (
  pathname: string,
  routesData: RoutesDataItem[],
  defaultParentItem: Partial<RoutesDataItem>,
): Partial<RoutesDataItem> => {
  let item: Partial<RoutesDataItem> = {};
  for (let index = 0, len = routesData.length; index < len; index += 1) {
    const element = routesData[index];
    if (element.path === pathname) {
      item = defaultParentItem;
      break;
    }

    if (element.routes) {
      item = getRouteParentItem(pathname, element.routes, element);
      if (Object.keys(item).length) {
        break;
      }
    }
  }

  return item;
};

/**
 * Format according to route path-get parent path
 * @param pathname path
 * @param separator Route delimiter-default /
 */
export const formatRoutePathTheParents = (
  pathname: string,
  separator: string = '/',
): string[] => {
  const arr: string[] = [];
  if (!pathname || pathname === '') {
    return arr;
  }

  const pathArr = pathname.split(separator);
  for (let index = 1, len = pathArr.length - 1; index < len; index += 1) {
    arr.push(pathArr.slice(0, index + 1).join(separator));
  }

  return arr;
};

/**
 * According to the route pathname array-return the corresponding route array
 * @param pathname path[]
 * @param routesData routes
 */
export const getPathsTheRoutes = (
  pathname: string[],
  routesData: RoutesDataItem[],
): RoutesDataItem[] => {
  const routeItem: RoutesDataItem[] = [];

  for (let index = 0, len = pathname.length; index < len; index += 1) {
    const element = pathname[index];
    const item = getRouteItem(element, routesData);
    if (item.path !== '') {
      routeItem.push(item);
    }
  }

  return routeItem;
};

/**
 * Get the route array corresponding to the breadcrumbs
 * @param route route current route Item
 * @param pathname path[]
 * @param routesData routes
 */
export const getBreadcrumbRoutes = (
  route: RoutesDataItem,
  pathname: string[],
  routesData: RoutesDataItem[],
  formatMessage?: (
    descriptor: any,
    values?: any,
  ) => string | React.ReactNodeArray,
): RoutesDataItem[] => {
  if (!route.breadcrumb) {
    const routePaths = getPathsTheRoutes(pathname, routesData);

    return route.breadcrumb === false ? routePaths : [...routePaths, route];
  }

  if (formatMessage) {
    if (route['breadcrumbFormatMessage'] === true) {
      return route.breadcrumb;
    } else {
      route['breadcrumbFormatMessage'] = true;
      return route.breadcrumb.map(item => {
        item.title = formatMessage({ id: item.title }) as string;
        return item;
      });
    }
  }

  return route.breadcrumb;
};

/**
 * Get the sidebar menu path selected by the current route
 * @param route route
 */
export const getSelectLeftMenuPath = (route: RoutesDataItem): string => {
  return route.selectLeftMenu || route.path;
};

/**
 * Get the top menu path corresponding to the current route
 * @param route route
 */
export const getRouteBelongTopMenu = (route: RoutesDataItem): string => {
  if (route.belongTopMenu) {
    return route.belongTopMenu;
  }
  return `/${route.path.split('/')[1]}`;
};

/**
 * Get the top menu path corresponding to the current route
 * @param pathname path
 * @param routes routes
 */
export const getRouteBelongTopMenuForRoutes = (
  pathname: string,
  routes: RoutesDataItem[],
): string => {
  const routeItem: RoutesDataItem = getRouteItem(pathname, routes);
  return getRouteBelongTopMenu(routeItem);
};

/**
 * Set the current item path according to the parent path
 * @param pathname path
 * @param parentPath Parent path-default /
 * @param headStart Route start header-default /
 */
export const setRoutePathForParent = (
  pathname: string,
  parentPath: string = '/',
  headStart: string = '/',
): string => {
  if (isExternal(pathname)) {
    return pathname;
  }

  return pathname.substr(0, headStart.length) === headStart
    ? pathname
    : `${parentPath}/${pathname}`;
};

/**
 * Return 404 route
 */
export const getNotFoundRoute = (): RoutesDataItem => {
  return {
    hidden: true,
    title: '',
    path: '*',
    component: settings.notFoundComponent,
  };
};

/**
 * Format the return umijs route, mainly dealing with special cases
 * @param routesData routes
 * @param parentPath Parent path - default /
 * @param headStart Route start header-default /
 */
export const umiRoutes = (
  routesData: RoutesDataItem[],
  parentPath: string = '/',
  headStart: string = '/',
): RoutesDataItem[] => {
  return routesData.map(item => {
    const { redirect, routes, ...other } = item;
    const itemRoutes = routes || [];
    const newItem: RoutesDataItem = { ...other };
    newItem.path = setRoutePathForParent(newItem.path, parentPath, headStart);

    /**
     * Handle jump[redirect]
     * Because react routing, if the parent has a redirect, the subset routing is no longer easy to use
     * Here it is processed as effective
     */
    if (item.redirect && item.routes) {
      newItem.routes = [
        ...umiRoutes(itemRoutes, newItem.path, headStart),
        {
          hidden: true,
          title: newItem.title,
          path: newItem.path,
          redirect: item.redirect,
        },
        getNotFoundRoute(),
      ];
    } else if (item.redirect && !item.routes) {
      newItem.redirect = redirect;
    } else if (!item.redirect && item.routes) {
      newItem.routes = [
        ...umiRoutes(itemRoutes, newItem.path, headStart),
        getNotFoundRoute(),
      ];
    } /*  else {

    } */

    return newItem;
  });
};

/**
 * Determine whether the current user has permission according to the custom incoming permission name
 * @param userRoles User's permissions
 * @param role Custom permission name
 */
export const hasPermissionRouteRoles = (
  userRoles: string[],
  role: string,
): boolean => {
  if (userRoles.includes('admin')) {
    return true;
  }

  return userRoles.includes(role);
};

/**
 * According to route.roles Determine whether the current user has permission
 * @param roles User's permissions
 * @param route Current route
 */
export const hasPermission = (
  roles: string[],
  route: RoutesDataItem,
): boolean => {
  if (roles.includes('admin')) {
    return true;
  }

  if (route.roles) {
    return route.roles.some(role => roles.includes(role));
    //return roles.some(role => route.roles?.includes(role));
  }

  return true;
};

/**
 * Obtain the corresponding authority menu according to user authority
 * @param roles User's permissions
 * @param routes Framework Corresponding Routing
 */
export const getPermissionMenuData = (
  roles: string[],
  routes: RoutesDataItem[],
): RoutesDataItem[] => {
  const menu: RoutesDataItem[] = [];
  for (let index = 0, len = routes.length; index < len; index += 1) {
    const element = routes[index];
    if (hasPermission(roles, element)) {
      if (element.routes) {
        element.routes = getPermissionMenuData(roles, element.routes);
      }
      menu.push(element);
    }
  }

  return menu;
};
