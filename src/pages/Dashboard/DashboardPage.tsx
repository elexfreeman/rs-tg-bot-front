import { FC, memo } from 'react';
import {
  NavIdProps,
  Panel,
  PanelHeader,
} from '@vkontakte/vkui';
import { ProjectList } from 'src/modules/Project/ProjectList';

export const DashboardPage: FC<NavIdProps> = memo((props: NavIdProps) => {
  return (
    <Panel className="Panel__fullScreen" {...props}>
      <PanelHeader delimiter="none">Проекты</PanelHeader>
      <ProjectList />
    </Panel>
  );
});

DashboardPage.displayName = 'DashboardPage';
