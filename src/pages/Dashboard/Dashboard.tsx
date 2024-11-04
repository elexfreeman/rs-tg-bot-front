import { FC, memo, useEffect } from 'react';
import {
  NavIdProps,
  Panel,
  PanelHeader,
  Group,
  CardGrid,
  ContentCard,
  CellButton,
} from '@vkontakte/vkui';
import { Icon28AddOutline } from '@vkontakte/icons';
import { DashboardCtrl } from './dashboard_ctrl';
import { useProjectStore } from 'src/store/project.store';

export const Dashboard: FC<NavIdProps> = memo((props: NavIdProps) => {
  const dashboardCtrl = DashboardCtrl.getInstance();
  const projectStore = useProjectStore();

  useEffect(() => {
    dashboardCtrl.projectList();
  }, []);

  return (
    <Panel className="Panel__fullScreen" {...props}>
      <PanelHeader delimiter="none">Проекты</PanelHeader>
      <Group>
        <CardGrid size="l">
          <CellButton
            onClick={() => dashboardCtrl.goToNewProject()}
            before={<Icon28AddOutline />}
          >
            Добавить проект
          </CellButton>
          {projectStore.list?.data?.map((item) => (
            <ContentCard
              key={item.id}
              subtitle=""
              header={item.caption}
              caption={item.description}
            />
          ))}
        </CardGrid>
      </Group>
    </Panel>
  );
});

Dashboard.displayName = 'Store';
