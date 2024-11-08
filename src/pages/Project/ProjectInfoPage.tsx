import { FC, memo } from 'react';
import {
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
} from '@vkontakte/vkui';
import { ProjectInfo } from 'src/modules/Project/ProjectInfo';
import { ProjectCtrl } from 'src/modules/Project/project_ctrl';
import { CacheLogList } from 'src/modules/CacheLog/CacheLogList';

export const ProjectInfoPage: FC<NavIdProps> = memo((props: NavIdProps) => {
  const projectCtrl = ProjectCtrl.getInstance();

  const projectInfoTable = (projectId: number) => (
    <CacheLogList projectId={projectId} />
  );

  return (
    <Panel className="Panel__fullScreen" {...props}>
      <PanelHeader
        delimiter="none"
        before={<PanelHeaderBack onClick={() => projectCtrl.goBack()} />}
      >
        Проект
      </PanelHeader>
      <ProjectInfo table={projectInfoTable} />
    </Panel>
  );
});

ProjectInfoPage.displayName = 'ProjectInfoPage';
