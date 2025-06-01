import { FC, memo } from 'react';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
} from '@vkontakte/vkui';
import { ProjectInfo } from 'src/modules/Project/ProjectInfo';
import { CacheLogList } from 'src/modules/CacheLog/CacheLogList';

export const ProjectInfoPage: FC<NavIdProps> = memo((props: NavIdProps) => {
  const routeNavigator = useRouteNavigator();

  const goBack = () => {
    routeNavigator.back();
  }

  const projectInfoTable = (projectId: number) => (
    <CacheLogList projectId={projectId} />
  );

  return (
    <Panel className="Panel__fullScreen" {...props}>
      <PanelHeader
        delimiter="none"
        before={<PanelHeaderBack onClick={() => goBack()} />}
      >
        Проект
      </PanelHeader>
      <ProjectInfo table={projectInfoTable} />
    </Panel>
  );
});

ProjectInfoPage.displayName = 'ProjectInfoPage';
