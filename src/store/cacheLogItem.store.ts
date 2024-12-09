import { bind } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { CacheLogItemI } from 'src/Entity/CacheLogItemE';
import { ResultI } from 'src/system/error_sys';

export interface CacheLogItemStoreI {
  isLoad?: boolean;
  list: ResultI<Partial<CacheLogItemI>[]>;
  add: ResultI<{id: number}>;
  update: ResultI<{id: number}>;
  info: ResultI<Partial<CacheLogItemI>>;
}

export const state: CacheLogItemStoreI = {
  isLoad: true,
  list: {},
  add: {},
  update: {},
  info: {},
};

export const defaultState = {...state};

const [change, setCacheLogItemStore] = createSignal<CacheLogItemStoreI>();
const [useCacheLogItemStore] = bind(change, defaultState);

export { setCacheLogItemStore, useCacheLogItemStore };
