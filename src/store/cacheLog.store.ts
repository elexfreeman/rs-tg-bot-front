import { bind } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { CacheLogI } from 'src/Entity/CacheLogE';
import { ResultI } from 'src/system/error_sys';

export interface CacheLogStoreI {
  isLoad?: boolean;
  list: ResultI<Partial<CacheLogI>[]>;
  add: ResultI<{id: number}>;
  update: ResultI<{id: number}>;
  info: ResultI<Partial<CacheLogI>>;
}

export const state: CacheLogStoreI = {
  isLoad: true,
  list: {},
  add: {},
  update: {},
  info: {},
};

export const defaultState = {...state};

const [change, setCacheLogStore] = createSignal<CacheLogStoreI>();
const [useCacheLogStore] = bind(change, defaultState);

export { setCacheLogStore, useCacheLogStore };
