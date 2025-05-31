import { useEffect } from 'react';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {
  Group,
  SimpleCell,
  InfoRow,
  Header,
  Title,
  CellButton,
} from '@vkontakte/vkui';
import { Icon20GearOutline } from '@vkontakte/icons';
import { infoProjectApi, ProjectI } from 'src/api/project_api';
import ProjectStore from 'src/store/project.store';
import { useParams } from '@vkontakte/vk-mini-apps-router';
import { delay } from 'src/utils';

export const ProjectInfo = (props: {table: (projectId: number) => React.ReactNode}) => {
  const projectStore = ProjectStore.useStore();
  const params = useParams<'project_id'>();
  const routeNavigator = useRouteNavigator();

  const infoProject = async (projectId: number) => {
    projectStore.info = { data: {} };
    ProjectStore.setStore({ ...projectStore });
    await delay();
    projectStore.info = await infoProjectApi(projectId);
    ProjectStore.setStore({ ...projectStore });
  };

  const goToUpdateProject = (projectId?: number) =>  {
    routeNavigator.push(`/ProjectUpdate/${projectId}`);
  }

  useEffect(() => {
    infoProject(Number(params?.project_id));
  }, []);

  const project: Partial<ProjectI> = {
    ...projectStore.info.data,
  };

  return (
    <>
      <Group>
        <SimpleCell multiline>
          <Title level="2">{project.caption}</Title>
        </SimpleCell>
      </Group>
      <Group header={<Header mode="secondary">Информация о проекте</Header>}>
        <SimpleCell multiline>
          <InfoRow header="Общий бюджет">3000 р.</InfoRow>
        </SimpleCell>
        <SimpleCell multiline>{project.description}</SimpleCell>
        <CellButton
          onClick={() => goToUpdateProject(project.id)}
          before={<Icon20GearOutline />}
        >
          Настроить проект
        </CellButton>
      </Group>
      {project.id && props.table(Number(project.id))}
      <div className='space-div'></div>
    </>
  );
};

ProjectInfo.displayName = 'ProjectInfo';
