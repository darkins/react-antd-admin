export interface SettingsType {
  /**
   * Site name
   */
  siteTitle: string;

  /**
   * Top menu open
   */
  topNavEnable: boolean;

  /**
   * Head fixed open
   */
  headFixed: boolean;

  /**
   * Site local storage Token of Key value
   */
  siteTokenKey: string;

  /**
   * Ajax Request header sending Token of Key value
   */
  ajaxHeadersTokenKey: string;

  /**
   * Ajax Return value does not participate in unified verification api address
   */
  ajaxResponseNoVerifyUrl: string[];

  /**
   * iconfont.cn Project generated online js address
   */
  iconfontUrl: string[];

  /**
   * 404 Template path
   */
  notFoundComponent: string;
}

const settings: SettingsType = {
  siteTitle: 'TE 2.0',
  topNavEnable: true,
  headFixed: true,
  siteTokenKey: 'admin_antd_react_token',
  ajaxHeadersTokenKey: 'x-token',
  ajaxResponseNoVerifyUrl: [
    '/user/login', // User Login
    '/user/info', // Get user info
  ],
  iconfontUrl: [],
  notFoundComponent: '@/pages/404',
};

export default settings;
