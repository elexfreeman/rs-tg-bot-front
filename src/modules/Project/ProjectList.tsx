import { useEffect } from 'react';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import ProjectStore, { useProjectStore } from 'src/store/project.store';
import { getProjectListApi,
} from 'src/api/project_api';
import {
  Group,
  CardGrid,
  ContentCard,
  CellButton,
} from '@vkontakte/vkui';
import { Icon28AddOutline } from '@vkontakte/icons';

export const ProjectList = () => {
  const projectStore = useProjectStore();
  const routeNavigator = useRouteNavigator();

  useEffect(() => {
    const fetchData = async() => {
      projectStore.list = await getProjectListApi();
      ProjectStore.setStore({ ...projectStore });
    }
    fetchData();
  }, []);

  const goToInfoProject = (projectId: number | undefined) => {
    routeNavigator.push(`ProjectInfo/${projectId}`);
  }

  const goToAddProject = () => {
    routeNavigator.push(`ProjectAdd`);
  }

  return (
    <Group>
      <CardGrid size="l">
        <CellButton
          onClick={() => goToAddProject()}
          before={<Icon28AddOutline />}
        >
          Добавить проект
        </CellButton>
        {projectStore.list?.data?.map((item) => (
          <ContentCard
            key={item.id}
            onClick={() => goToInfoProject(item.id)}
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
