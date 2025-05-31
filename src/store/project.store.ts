import { bind } from '@react-rxjs/core';
import { createSignal } from '@react-rxjs/utils';
import { ProjectI } from 'src/api/project_api';
import { ResultI } from 'src/system/error_sys';

export interface ProjectStoreI {
  isLoad?: boolean;
  list: ResultI<Partial<ProjectI>[]>;
  add: ResultI<{ id: number }>;
  update: ResultI<{ id: number }>;
  info: ResultI<Partial<ProjectI>>;
}

export default new class ProjectStore {
  setStore:  (payload: ProjectStoreI) => void;
  useStore: () => ProjectStoreI;

  readonly defaultState: ProjectStoreI = {
    isLoad: true,
    list: {},
    add: {},
    update: {},
    info: {},
  };

  constructor() {
    const [change, setProjectStore] = createSignal<ProjectStoreI>();
    const [useProjectStore] = bind(change, this.defaultState);

    this.setStore = setProjectStore;
    this.useStore = useProjectStore;

    this.setStore(this.defaultState);
  }

}
