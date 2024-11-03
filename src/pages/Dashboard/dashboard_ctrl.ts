import { RouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { ProjectStoreI } from '../../store/project.store';
import { getProjectList } from 'src/api/project_api';

export class DashboardCtrl {
  projectStore: ProjectStoreI;
  setProjectStore: (payload: ProjectStoreI) => void;
  routeNavigator: RouteNavigator;

  constructor(
    routeNavigator: RouteNavigator,
    store: ProjectStoreI,
    setProjectStore: (payload: ProjectStoreI) => void
  ) {
    this.projectStore = store;
    this.routeNavigator = routeNavigator;
    this.setProjectStore = setProjectStore;
  }

  async projectList() {
    this.projectStore.list = await getProjectList();
    this.setProjectStore({ ...this.projectStore });
    return this.projectStore;
  }

  goToNewProject() {
    this.routeNavigator.push(`ProjectAdd`);
  }
}
