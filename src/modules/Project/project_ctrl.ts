import { RouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Store } from 'src/store/store';
import {
  addProject,
  updateProject,
  infoProject,
  getProjectList,
} from 'src/api/project_api';
import { delay } from 'src/utils';
import { ProjectI } from 'src/Entity/ProjectE';

export class ProjectCtrl {
  private isInit = false;
  routeNavigator: RouteNavigator;

  private constructor() {
    let a: any = 0;
    this.routeNavigator = a;
  }

  private static instance: ProjectCtrl;

  public static init(routeNavigator: RouteNavigator) {
    const ctrl = ProjectCtrl.getInstance();
    ctrl.routeNavigator = routeNavigator;
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
    Store.getInstance().projectStore.add = await addProject(project);
    Store.getInstance().setProjectStore({ ...Store.getInstance().projectStore });
    if (!Store.getInstance().projectStore.add.error) {
      this.routeNavigator.back();
    }
  }

  async updateProject(project: Partial<ProjectI>) {
    if (!this.isInit) {
      return;
    }
    Store.getInstance().projectStore.update = await updateProject(project);
    Store.getInstance().setProjectStore({ ...Store.getInstance().projectStore });
    if (!Store.getInstance().projectStore.update.error) {
      this.routeNavigator.back();
    }
  }

  async infoProject(projectId: number) {
    if (!this.isInit) {
      return;
    }
    Store.getInstance().projectStore.info = { data: {} };
    Store.getInstance().setProjectStore({ ...Store.getInstance().projectStore });
    await delay();
    Store.getInstance().projectStore.info = await infoProject(projectId);
    Store.getInstance().setProjectStore({ ...Store.getInstance().projectStore });
  }

  goBack() {
    if (!this.isInit) {
      return;
    }
    this.routeNavigator.back();
  }

  goToUpdateProject(projectId?: number) {
    if (!this.isInit) {
      return;
    }
    this.routeNavigator.push(`/ProjectUpdate/${projectId}`);
  }

  goToAddCache() {
    if (!this.isInit) {
      return;
    }
    this.routeNavigator.push(`/`);
  }

  goToAddProject() {
    if (!this.isInit) {
      return;
    }
    this.routeNavigator.push(`ProjectAdd`);
  }

  goToInfoProject(projectId?: number) {
    if (!this.isInit) {
      return;
    }
    this.routeNavigator.push(`ProjectInfo/${projectId}`);
  }

  async projectList() {
    if (!this.isInit) {
      return;
    }
    Store.getInstance().projectStore.list = await getProjectList();
    Store.getInstance().setProjectStore({ ...Store.getInstance().projectStore });
    return Store.getInstance().projectStore;
  }
}
