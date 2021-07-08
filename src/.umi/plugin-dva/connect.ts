// @ts-nocheck
import { IRoute } from '@umijs/core';
import { AnyAction } from 'redux';
import React from 'react';
import { EffectsCommandMap, SubscriptionAPI } from 'dva';
import { match } from 'react-router-dom';
import { Location, LocationState, History } from 'history';

export * from 'C:/work/Aid-Tech/te2-prototype/src/models/global';
export * from 'C:/work/Aid-Tech/te2-prototype/src/models/user';
export * from 'C:/work/Aid-Tech/te2-prototype/src/pages/home/model';
export * from 'C:/work/Aid-Tech/te2-prototype/src/pages/reliefs/brian/assets/model';
export * from 'C:/work/Aid-Tech/te2-prototype/src/pages/reliefs/brian/beneficiaries/model';
export * from 'C:/work/Aid-Tech/te2-prototype/src/pages/reliefs/brian/disbursements/table/model';
export * from 'C:/work/Aid-Tech/te2-prototype/src/pages/reliefs/brian/summary/model';
export * from 'C:/work/Aid-Tech/te2-prototype/src/pages/reliefs/detail/basic/model';
export * from 'C:/work/Aid-Tech/te2-prototype/src/pages/reliefs/detail/module/model';
export * from 'C:/work/Aid-Tech/te2-prototype/src/pages/reliefs/detail/table/model';
export * from 'C:/work/Aid-Tech/te2-prototype/src/pages/reliefs/form/basic/model';
export * from 'C:/work/Aid-Tech/te2-prototype/src/pages/reliefs/form/complex/model';
export * from 'C:/work/Aid-Tech/te2-prototype/src/pages/user/login/model';
export * from 'C:/work/Aid-Tech/te2-prototype/src/pages/user/register/model';

export interface Action<T = any> {
  type: T
}

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;

export type ImmerReducer<S = any, A extends Action = AnyAction> = (
  state: S,
  action: A
) => void;

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap,
) => void;

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch<P = any, C = (payload: P) => void> = (action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export type Subscription = (api: SubscriptionAPI, done: Function) => void | Function;

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    [key: string]: any;
  };
}

/**
 * @type P: Params matched in dynamic routing
 */
export interface ConnectProps<
  P extends { [K in keyof P]?: string } = {},
  S = LocationState,
  T = {}
> {
  dispatch?: Dispatch;
  // https://github.com/umijs/umi/pull/2194
  match?: match<P>;
  location: Location<S> & { query: T };
  history: History;
  route: IRoute;
}

export type RequiredConnectProps<
  P extends { [K in keyof P]?: string } = {},
  S = LocationState,
  T = {}
  > = Required<ConnectProps<P, S, T>>

/**
 * @type T: React props
 * @type U: match props types
 */
export type ConnectRC<
  T = {},
  U = {},
  S = {},
  Q = {}
> = React.ForwardRefRenderFunction<any, T & RequiredConnectProps<U, S, Q>>;

