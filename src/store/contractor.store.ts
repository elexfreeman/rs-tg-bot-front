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

export const defaultState = {...state};

const [change, setContractorStore] = createSignal<ContractorStoreI>();
const [useContractorStore] = bind(change, defaultState);

export { setContractorStore, useContractorStore };
