import {  useEffect } from 'react';
import {
  Group,
} from '@vkontakte/vkui';
import { infoProjectApi, ProjectI } from 'src/api/project_api';
import { ProjectAddEditForm } from 'src/modules/Project/ProjectAddEditForm';
import ProjectStore from 'src/store/project.store';
import { delay } from 'src/utils';

export const ProjectUpdate = (props: {projectId: number}) => {
  const projectStore = ProjectStore.useStore();

  const infoProject = async (projectId: number) => {
    projectStore.info = { data: {} };
    ProjectStore.setStore({ ...projectStore });
    await delay();
    projectStore.info = await infoProjectApi(projectId);
    ProjectStore.setStore({ ...projectStore });
  };

  useEffect(() => {
    infoProject(props.projectId);
  }, []);

  const newProject: Partial<ProjectI> = {
    ...projectStore.info.data,
  };

  return (
    <Group description="">
      <ProjectAddEditForm project={newProject} isUpdate />
    </Group>
  );
};

ProjectUpdate.displayName = 'ProjectUpdate';
