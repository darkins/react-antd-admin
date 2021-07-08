import { Reducer /* , Effect */ } from 'umi';
import settings from '@/config/settings';

export interface GlobalModelState {
  // Expand and collapse on the left
  collapsed: boolean;
  // Top menu open
  topNavEnable: boolean;
  // Head fixed open
  headFixed: boolean;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {};
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    setTopNavEnable: Reducer<GlobalModelState>;
    setHeadFixed: Reducer<GlobalModelState>;
  };
}

const initState: GlobalModelState = {
  collapsed: false,
  topNavEnable: settings.topNavEnable,
  headFixed: settings.headFixed,
};

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: initState,

  effects: {},

  reducers: {
    changeLayoutCollapsed(state, { payload }): GlobalModelState {
      return {
        ...initState,
        ...state,
        collapsed: payload,
      };
    },
    setTopNavEnable(state, { payload }): GlobalModelState {
      return {
        ...initState,
        ...state,
        topNavEnable: payload,
      };
    },
    setHeadFixed(state, { payload }): GlobalModelState {
      return {
        ...initState,
        ...state,
        headFixed: payload,
      };
    },
  },
};

export default GlobalModel;
