import { bind } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { ContractorI } from 'src/api/contractor_api';
import { ResultI } from 'src/system/error_sys';

export interface ContractorStoreI {
  isLoad?: boolean;
  list: ResultI<Partial<ContractorI>[]>;
  add: ResultI<{id: number}>;
  update: ResultI<{id: number}>;
  info: ResultI<Partial<ContractorI>>;
}

export const state: ContractorStoreI = {
  isLoad: true,
  list: {},
  add: {},
  update: {},
  info: {},
};

export default new class ContractorStore {
  setStore:  (payload: ContractorStoreI) => void;
  useStore: () => ContractorStoreI;

  readonly defaultState: ContractorStoreI = {
    isLoad: true,
    list: {},
    add: {},
    update: {},
    info: {},
  };

  constructor() {
    const [change, setContractorStore] = createSignal<ContractorStoreI>();
    const [useContractorStore] = bind(change, this.defaultState);

    this.setStore = setContractorStore;
    this.useStore = useContractorStore;

    this.setStore(this.defaultState);
  }
}
