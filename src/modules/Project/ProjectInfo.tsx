import { useEffect } from 'react';
import {
  Group,
  SimpleCell,
  InfoRow,
  Header,
  Title,
  CellButton,
} from '@vkontakte/vkui';
import { Icon20GearOutline } from '@vkontakte/icons';
import { ProjectCtrl } from './project_ctrl';
import { ProjectI } from 'src/api/project_api';
import { useProjectStore } from 'src/modules/Project/project.store';
import { useParams } from '@vkontakte/vk-mini-apps-router';

export const ProjectInfo = (props: {table: (projectId: number) => React.ReactNode}) => {
  const projectStore = useProjectStore();
  const projectCtrl = ProjectCtrl.getInstance();
  const params = useParams<'project_id'>();
  useEffect(() => {
    projectCtrl.infoProject(Number(params?.project_id));
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
          onClick={() => projectCtrl.goToUpdateProject(project.id)}
          before={<Icon20GearOutline />}
        >
          Настроить проект
        </CellButton>
      </Group>
      {project.id && props.table(Number(project.id))}
      <div style={{ padding: '100px 0' }}></div>
    </>
  );
};

ProjectInfo.displayName = 'ProjectInfo';
