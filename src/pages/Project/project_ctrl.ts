import { RouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {
  ProjectStoreI,
  setProjectStore,
  defaultState as projectStoreDefaultState,
} from '../../store/project.store';
import {
  addProject,
  updateProject,
  infoProject,
  ProjectI,
} from 'src/api/project_api';
import { delay } from 'src/utils';

export class ProjectCtrl {
  private isInit = false;
  projectStore: ProjectStoreI;
  setProjectStore: (payload: ProjectStoreI) => void;
  routeNavigator: RouteNavigator;

  private constructor() {
    this.projectStore = { ...projectStoreDefaultState };
    // eslint-disable-next-line
    this.setProjectStore = (payload: ProjectStoreI) => {};
    let a: any = 0;
    this.routeNavigator = a;
  }

  private static instance: ProjectCtrl;

  public static init(
    routeNavigator: RouteNavigator,
    store: ProjectStoreI,
    setProjectStore: (payload: ProjectStoreI) => void
  ) {
    const ctrl = ProjectCtrl.getInstance();
    ctrl.projectStore = store;
    ctrl.routeNavigator = routeNavigator;
    ctrl.setProjectStore = setProjectStore;
    ctrl.isInit = true;
  }

  public static getInstance(): ProjectCtrl {
    if (!ProjectCtrl.instance) {
      ProjectCtrl.instance = new ProjectCtrl();
    }
    return ProjectCtrl.instance;
  }

  async addProject(project: Partial<ProjectI>) {
    if (!this.isInit) {
      return;
    }
    this.projectStore.add = await addProject(project);
    setProjectStore({ ...this.projectStore });
    if (!this.projectStore.add.error) {
      this.routeNavigator.back();
    }
  }

  async updateProject(project: Partial<ProjectI>) {
    if (!this.isInit) {
      return;
    }
    this.projectStore.update = await updateProject(project);
    setProjectStore({ ...this.projectStore });
    if (!this.projectStore.update.error) {
      this.routeNavigator.back();
    }
  }

  async infoProject(projectId: number) {
    if (!this.isInit) {
      return;
    }
    this.projectStore.info = { data: {} };
    setProjectStore({ ...this.projectStore });
    await delay();
    this.projectStore.info = await infoProject(projectId);
    setProjectStore({ ...this.projectStore });
  }

  goBack() {
    if (!this.isInit) {
      return;
    }
    this.routeNavigator.back();
  }
}
