import { bind } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { ProjectI } from 'src/api/project_api';
import { ResultI } from 'src/system/error_sys';

export interface ProjectStoreI {
  isLoad?: boolean;
  list?: ResultI<Partial<ProjectI>[]>;
  add?: ResultI<{id: number}>;
}

export const state: ProjectStoreI = {
  isLoad: true,
  list: {},
  add: {},
};

export const defaultState = state;

const [change, setProjectStore] = createSignal<ProjectStoreI>();
const [useProjectStore] = bind(change, defaultState);

export { setProjectStore, useProjectStore };
