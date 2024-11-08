import { Group } from '@vkontakte/vkui';
import { ProjectI } from 'src/api/project_api';
import { ProjectAddEditForm } from 'src/modules/Project/ProjectAddEditForm';

export const ProjectAdd = () => {
  const newEntity: ProjectI = {
    id: 0,
    caption: '',
    description: '',
  };

  return (
    <Group description="">
      <ProjectAddEditForm project={newEntity} />
    </Group>
  );
};

ProjectAdd.displayName = 'ProjectAdd';
