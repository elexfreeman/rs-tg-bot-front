import { bind } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { CacheLogItemI } from 'src/Entity/CacheLogItemE';
import { Result, ResultI } from 'src/system/error_sys';

export interface CacheLogItemStoreI {
  isLoad?: boolean;
  list: ResultI<Partial<CacheLogItemI>[]>;
  listUpdate: ResultI<Partial<CacheLogItemI>[]>;
  add: ResultI<{id: number}>;
  update: ResultI<{id: number}>;
  info: ResultI<Partial<CacheLogItemI>>;
  getData: () => CacheLogItemStoreI;
}

export const state: CacheLogItemStoreI = {
  isLoad: true,
  list: Result.setData([]),
  listUpdate: Result.setData([]),
  add: {},
  update: {},
  info: {},
  getData: () => {
    return state
  }
};

export const defaultState = {...state};

const [change, setCacheLogItemStore] = createSignal<CacheLogItemStoreI>();
const [useCacheLogItemStore] = bind(change, defaultState);

export { setCacheLogItemStore, useCacheLogItemStore };
