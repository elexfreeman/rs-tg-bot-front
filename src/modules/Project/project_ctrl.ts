import { RouteNavigator } from '@vkontakte/vk-mini-apps-router';
import ProjectStore from 'src/store/project.store';
import {
  addProjectApi,
  updateProjectApi,
  infoProjectApi,
  getProjectListApi,
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
    const projectStore = ProjectStore.useStore();
    projectStore.add = await addProjectApi(project);
    ProjectStore.setStore({ ...projectStore });
    if (!projectStore.add.error) {
      this.routeNavigator.back();
    }
  }

  async updateProject(project: Partial<ProjectI>) {
    if (!this.isInit) {
      return;
    }
    const projectStore = ProjectStore.useStore();

    projectStore.update = await updateProjectApi(project);
    ProjectStore.setStore({ ...projectStore });
    if (!projectStore.update.error) {
      this.routeNavigator.back();
    }
  }

  async infoProject(projectId: number) {
    if (!this.isInit) {
      return;
    }

    const projectStore = ProjectStore.useStore();
    projectStore.info = { data: {} };
    ProjectStore.setStore({ ...projectStore });
    await delay();
    projectStore.info = await infoProjectApi(projectId);
    ProjectStore.setStore({ ...projectStore });
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
    const projectStore = ProjectStore.useStore();

    projectStore.list = await getProjectListApi();
    ProjectStore.setStore({ ...projectStore });
    return projectStore;
  }
}
