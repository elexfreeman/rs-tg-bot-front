import {
  ContractorStoreI,
  defaultState as conntractorStoreDefaultState,
} from 'src/store/contractor.store';

import {
  CacheLogItemStoreI,
  defaultState as cacheLogItemStoreDefaultState,
} from 'src/store/cacheLogItem.store';

export class Store {
  private static instance: Store;

  contractorStore: ContractorStoreI;
  setContractorStore: (payload: ContractorStoreI) => void;

  cacheLogItemStore: CacheLogItemStoreI;
  setCacheLogItemStore: (payload: CacheLogItemStoreI) => void;

  private constructor() {
    this.contractorStore = { ...conntractorStoreDefaultState };
    // eslint-disable-next-line
    this.setContractorStore = (payload: ContractorStoreI) => {};

    this.cacheLogItemStore = { ...cacheLogItemStoreDefaultState };
    // eslint-disable-next-line
    this.setCacheLogItemStore = (payload: CacheLogItemStoreI) => {};
  }

  public static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  initContractorStore(store: ContractorStoreI, setStore: (payload: ContractorStoreI) => void): Store {
    this.contractorStore = store;
    this.setContractorStore = setStore;
    return this;
  }

  initCacheLogItemStore(store: CacheLogItemStoreI, setStore: (payload: CacheLogItemStoreI) => void): Store {
    this.cacheLogItemStore = store;
    this.setCacheLogItemStore = setStore;
    return this;
  }
}
