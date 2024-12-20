import {  useEffect } from 'react';
import {
  Group,
} from '@vkontakte/vkui';
import { ProjectCtrl } from 'src/modules/Project/project_ctrl';
import { ProjectI } from 'src/api/project_api';
import { ProjectAddEditForm } from 'src/modules/Project/ProjectAddEditForm';
import { useProjectStore } from 'src/store/project.store';

export const ProjectUpdate = (props: {projectId: number}) => {
  const projectStore = useProjectStore();
  const projectCtrl = ProjectCtrl.getInstance();

  useEffect(() => {
    projectCtrl.infoProject(props.projectId);
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
