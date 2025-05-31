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

export default new class CacheLogStore {
  setStore:  (payload: CacheLogStoreI) => void;
  useStore: () => CacheLogStoreI;

  readonly defaultState: CacheLogStoreI = {
    isLoad: true,
    list: {},
    add: {},
    update: {},
    info: {},
  };

  constructor() {
    const [change, setCacheLogStore] = createSignal<CacheLogStoreI>();
    const [useCacheLogStore] = bind(change, this.defaultState);

    this.setStore = setCacheLogStore;
    this.useStore = useCacheLogStore;

    this.setStore(this.defaultState);
  }

}
