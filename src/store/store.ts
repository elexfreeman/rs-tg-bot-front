import {
  ProjectStoreI,
  defaultState as projectStoreDefaultState,
} from 'src/store/project.store';

import {
  ContractorStoreI,
  defaultState as conntractorStoreDefaultState,
} from 'src/store/contractor.store';

import {
  CacheLogStoreI,
  defaultState as cacheLogStoreDefaultState,
} from 'src/store/cacheLog.store';

export class Store {
  private static instance: Store;

  projectStore: ProjectStoreI;
  setProjectStore: (payload: ProjectStoreI) => void;

  contractorStore: ContractorStoreI;
  setContractorStore: (payload: ContractorStoreI) => void;

  cacheLogStore: CacheLogStoreI;
  setCacheLogStore: (payload: CacheLogStoreI) => void;

  private constructor() {
    this.projectStore = { ...projectStoreDefaultState };
    // eslint-disable-next-line
    this.setProjectStore = (payload: ProjectStoreI) => {};

    this.contractorStore = { ...conntractorStoreDefaultState };
    // eslint-disable-next-line
    this.setContractorStore = (payload: ContractorStoreI) => {};

    this.cacheLogStore = { ...cacheLogStoreDefaultState };
    // eslint-disable-next-line
    this.setCacheLogStore = (payload: CacheLogStoreI) => {};
  }

  public static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  initProjectStore(store: ProjectStoreI, setStore: (payload: ProjectStoreI) => void): Store {
    this.projectStore = store;
    this.setProjectStore = setStore;
    return this;
  }

  initContractorStore(store: ContractorStoreI, setStore: (payload: ContractorStoreI) => void): Store {
    this.contractorStore = store;
    this.setContractorStore = setStore;
    return this;
  }

  initCacheLogStore(store: CacheLogStoreI, setStore: (payload: CacheLogStoreI) => void): Store {
    this.cacheLogStore = store;
    this.setCacheLogStore = setStore;
    return this;
  }
}
