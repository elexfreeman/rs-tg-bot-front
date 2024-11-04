import { RouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { ProjectStoreI, setProjectStore } from '../../store/project.store';
import { addProject, ProjectI } from 'src/api/project_api';

export class ProjectCtrl {
  private isInit = false;
  projectStore: ProjectStoreI
  setProjectStore: (payload: ProjectStoreI) => void;
  routeNavigator: RouteNavigator;

  private constructor() {
    this.projectStore = { };
    // eslint-disable-next-line
    this.setProjectStore = (payload:ProjectStoreI) => {};
    let a:any = 0;
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

  async addProject(project: ProjectI) {
    if (!this.isInit) {
      return;
    }
    this.projectStore.add = await addProject(project);
    setProjectStore({ ...this.projectStore });
    if (!this.projectStore.add.error) {
      this.routeNavigator.back();
    }
  }

  goBack() {
    if (!this.isInit) {
      return;
    }
    this.routeNavigator.back();
  }
}
