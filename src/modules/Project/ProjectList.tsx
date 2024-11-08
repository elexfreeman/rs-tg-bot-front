import { useEffect } from 'react';
import {
  Group,
  CardGrid,
  ContentCard,
  CellButton,
} from '@vkontakte/vkui';
import { Icon28AddOutline } from '@vkontakte/icons';
import { ProjectCtrl } from 'src/modules/Project/project_ctrl';
import { useProjectStore } from 'src/modules/Project/project.store';

export const ProjectList = () => {
  const projectCtrl = ProjectCtrl.getInstance();
  const projectStore = useProjectStore();

  useEffect(() => {
    projectCtrl.projectList();
  }, []);

  return (
    <Group>
      <CardGrid size="l">
        <CellButton
          onClick={() => projectCtrl.goToAddProject()}
          before={<Icon28AddOutline />}
        >
          Добавить проект
        </CellButton>
        {projectStore.list?.data?.map((item) => (
          <ContentCard
            key={item.id}
            onClick={() => projectCtrl.goToInfoProject(item.id)}
            subtitle=""
            header={item.caption}
            caption={item.description}
          />
        ))}
      </CardGrid>
    </Group>
  );
};

ProjectList.displayName = 'ProjectList';
