import { RouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { ProjectStoreI, setProjectStore } from '../../store/project.store';
import { addProject, ProjectI } from 'src/api/project_api';

export class ProjectCtrl {
  projectStore: ProjectStoreI;
  setProjectStore: (payload: ProjectStoreI) => void;
  routeNavigator: RouteNavigator;

  constructor(routeNavigator: RouteNavigator, store: ProjectStoreI, setProjectStore: (payload: ProjectStoreI) => void ) {
    this.projectStore = store;
    this.routeNavigator = routeNavigator;
    this.setProjectStore = setProjectStore;
  }

  async addProject(project: ProjectI) {
    this.projectStore.add = await addProject(project);
    setProjectStore({ ...this.projectStore });
    if (!this.projectStore.add.error) {
      this.routeNavigator.back();
    }
  }

  goBack() {
    this.routeNavigator.back();
  }
}
