// @ts-nocheck
import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
import dva from 'dva';
// @ts-ignore
import createLoading from 'C:/work/Aid-Tech/te2-prototype/node_modules/dva-loading/dist/index.esm.js';
import { plugin, history } from '../core/umiExports';
import ModelGlobal0 from 'C:/work/Aid-Tech/te2-prototype/src/models/global.ts';
import ModelUser1 from 'C:/work/Aid-Tech/te2-prototype/src/models/user.ts';
import ModelModel2 from 'C:/work/Aid-Tech/te2-prototype/src/pages/home/model.ts';
import ModelModel3 from 'C:/work/Aid-Tech/te2-prototype/src/pages/reliefs/brian/assets/model.ts';
import ModelModel4 from 'C:/work/Aid-Tech/te2-prototype/src/pages/reliefs/brian/beneficiaries/model.ts';
import ModelModel5 from 'C:/work/Aid-Tech/te2-prototype/src/pages/reliefs/brian/disbursements/table/model.ts';
import ModelModel6 from 'C:/work/Aid-Tech/te2-prototype/src/pages/reliefs/brian/summary/model.ts';
import ModelModel7 from 'C:/work/Aid-Tech/te2-prototype/src/pages/reliefs/detail/basic/model.ts';
import ModelModel8 from 'C:/work/Aid-Tech/te2-prototype/src/pages/reliefs/detail/module/model.ts';
import ModelModel9 from 'C:/work/Aid-Tech/te2-prototype/src/pages/reliefs/detail/table/model.ts';
import ModelModel10 from 'C:/work/Aid-Tech/te2-prototype/src/pages/reliefs/form/basic/model.ts';
import ModelModel11 from 'C:/work/Aid-Tech/te2-prototype/src/pages/reliefs/form/complex/model.ts';
import ModelModel12 from 'C:/work/Aid-Tech/te2-prototype/src/pages/user/login/model.ts';
import ModelModel13 from 'C:/work/Aid-Tech/te2-prototype/src/pages/user/register/model.ts';

let app:any = null;

export function _onCreate(options = {}) {
  const runtimeDva = plugin.applyPlugins({
    key: 'dva',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    // @ts-ignore
    ...(typeof window !== 'undefined' && window.g_useSSR ? { initialState: window.g_initialProps } : {}),
    ...(options || {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach((plugin:any) => {
    app.use(plugin);
  });
  app.model({ namespace: 'global', ...ModelGlobal0 });
app.model({ namespace: 'user', ...ModelUser1 });
app.model({ namespace: 'model', ...ModelModel2 });
app.model({ namespace: 'model', ...ModelModel3 });
app.model({ namespace: 'model', ...ModelModel4 });
app.model({ namespace: 'model', ...ModelModel5 });
app.model({ namespace: 'model', ...ModelModel6 });
app.model({ namespace: 'model', ...ModelModel7 });
app.model({ namespace: 'model', ...ModelModel8 });
app.model({ namespace: 'model', ...ModelModel9 });
app.model({ namespace: 'model', ...ModelModel10 });
app.model({ namespace: 'model', ...ModelModel11 });
app.model({ namespace: 'model', ...ModelModel12 });
app.model({ namespace: 'model', ...ModelModel13 });
  return app;
}

export function getApp() {
  return app;
}

/**
 * whether browser env
 * 
 * @returns boolean
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
}

export class _DvaContainer extends Component {
  constructor(props: any) {
    super(props);
    // run only in client, avoid override server _onCreate()
    if (isBrowser()) {
      _onCreate()
    }
  }

  componentWillUnmount() {
    let app = getApp();
    app._models.forEach((model:any) => {
      app.unmodel(model.namespace);
    });
    app._models = [];
    try {
      // 释放 app，for gc
      // immer 场景 app 是 read-only 的，这里 try catch 一下
      app = null;
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    let app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
