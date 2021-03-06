import React, { useState, useEffect } from 'react';
import { connect, ConnectProps, Helmet, useIntl } from 'umi';
import { GlobalModelState } from '@/models/global';
import { UserModelState } from '@/models/user';

import {
  getRouteItem,
  getRouteBelongTopMenu,
  getSelectLeftMenuPath,
  getPermissionMenuData,
  formatRoutePathTheParents,
  getBreadcrumbRoutes,
  RoutesDataItem,
} from '@/utils/routes';
import { mergeUnique as ArrayMergeUnique } from '@/utils/array';
import settings from '@/config/settings';

import Permission from '@/components/Permission';
import Left from './components/Left';
import RightTop from './components/RightTop';
import RightFooter from './components/RightFooter';
import Settings from './components/Settings';

import IndexLayoutRoutes from './routes';

import styles from './style.less';

export interface IndexLayoutProps extends ConnectProps {
  collapsed: boolean;
  topNavEnable: boolean;
  headFixed: boolean;
  userRoles: string[];
}

const IndexLayout: React.FC<IndexLayoutProps> = props => {
  const {
    collapsed,
    topNavEnable,
    headFixed,
    userRoles,
    dispatch,
    location,
    route,
    children,
  } = props;

  const { formatMessage } = useIntl();

  const { pathname } = location;
  const { routes } = route;

  const readRouteItem = (): RoutesDataItem => {
    return getRouteItem(pathname, routes as RoutesDataItem[]);
  };

  const [routeItem, setRouteItem] = useState<RoutesDataItem>({
    title: '',
    path: '',
  });
  const [belongTopMenu, setBelongTopMenu] = useState<string>('');
  const [selectedKey, setSelectedKey] = useState<string>('');

  const [routeParentPaths, setRouteParentPaths] = useState<string[]>([]);
  const [leftOpenKeys, setLeftOpenKeys] = useState<string[]>(routeParentPaths);

  const [breadcrumb, setBreadcrumb] = useState<RoutesDataItem[]>([]);

  const [menuData, setMenuData] = useState<RoutesDataItem[]>([]);

  // 收缩左侧
  const toggleCollapsed = (): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload: !collapsed,
      });
    }
  };

  // Set the current routing item content, parent routing paths array
  useEffect(() => {
    const routeItem = readRouteItem();
    const routeParentPaths = formatRoutePathTheParents(pathname);
    const breadcrumbRoutes = getBreadcrumbRoutes(
      routeItem,
      routeParentPaths,
      routes as RoutesDataItem[],
      formatMessage,
    );
    setRouteItem(routeItem);
    setRouteParentPaths(routeParentPaths);
    setBreadcrumb(breadcrumbRoutes);
  }, [pathname]);

  // Set the top menu and the selected menu on the left
  useEffect(() => {
    setBelongTopMenu(getRouteBelongTopMenu(routeItem));
    setSelectedKey(getSelectLeftMenuPath(routeItem));
  }, [routeItem]);

  // Update the submenu key expanded by the left menu
  useEffect(() => {
    if (routeParentPaths.length && !collapsed) {
      setLeftOpenKeys(ArrayMergeUnique<string>(leftOpenKeys, routeParentPaths));
      // setLeftOpenKeys(routeParentPaths);
    }
  }, [routeParentPaths, collapsed]);

  // Set permissions menu according to user permissions
  useEffect(() => {
    setMenuData(getPermissionMenuData(userRoles, IndexLayoutRoutes));
  }, [userRoles]);

  return (
    <div id={styles.indexlayout}>
      <Helmet>
        <title>{`${routeItem.title} - ${settings.siteTitle}`}</title>
      </Helmet>
      <Left
        collapsed={collapsed}
        topNavEnable={topNavEnable}
        belongTopMenu={belongTopMenu}
        selectedKeys={[selectedKey]}
        openKeys={leftOpenKeys}
        onOpenChange={setLeftOpenKeys}
        menuData={menuData}
      />

      <div
        id={styles['indexlayout-right']}
        className={headFixed ? styles['fiexd-header'] : ''}
      >
        <RightTop
          collapsed={collapsed}
          topNavEnable={topNavEnable}
          belongTopMenu={belongTopMenu}
          toggleCollapsed={toggleCollapsed}
          breadCrumbs={breadcrumb}
          menuData={menuData}
        />

        <div className={styles['indexlayout-right-main']}>
          <Permission userRoles={userRoles} routeOrRole={routeItem}>
            {children}
          </Permission>

          <RightFooter />
        </div>
      </div>

      <Settings />
    </div>
  );
};

export default connect(
  ({ global, user }: { global: GlobalModelState; user: UserModelState }) => ({
    collapsed: global.collapsed,
    topNavEnable: global.topNavEnable,
    headFixed: global.headFixed,
    userRoles: user.currentUser.roles,
  }),
)(IndexLayout);
