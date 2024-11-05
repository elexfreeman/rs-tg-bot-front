import { RouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {
  ProjectStoreI,
  defaultState as projectStoreDefaultState,
} from '../../store/project.store';
import { getProjectList } from 'src/api/project_api';

export class DashboardCtrl {
  projectStore: ProjectStoreI
  setProjectStore: (payload: ProjectStoreI) => void;
  routeNavigator: RouteNavigator;
  private isInit = false;

  private constructor() {
    this.projectStore = {...projectStoreDefaultState};
    // eslint-disable-next-line
    this.setProjectStore = (payload:ProjectStoreI) => {};
    let a:any = 0;
    this.routeNavigator = a;
  }

  private static instance: DashboardCtrl;

  public static init(
    routeNavigator: RouteNavigator,
    store: ProjectStoreI,
    setProjectStore: (payload: ProjectStoreI) => void
  ) {
    const ctrl = DashboardCtrl.getInstance();
    ctrl.projectStore = store;
    ctrl.routeNavigator = routeNavigator;
    ctrl.setProjectStore = setProjectStore;
    ctrl.isInit = true;
  }


  public static getInstance(): DashboardCtrl {
    if (!DashboardCtrl.instance) {
      DashboardCtrl.instance = new DashboardCtrl();
    }
    return DashboardCtrl.instance;
  }

  async projectList() {
    if (!this.isInit) {
      return;
    }
      this.projectStore.list = await getProjectList();
      this.setProjectStore({ ...this.projectStore });
      return this.projectStore;
  }

  goToAddProject() {
    if (!this.isInit) {
      return;
    }
    this.routeNavigator.push(`ProjectAdd`);
  }

  goToUpdateProject(projectId?: number) {
    if (!this.isInit) {
      return;
    }
    this.routeNavigator.push(`ProjectUpdate/${projectId}`);
  }
}
