import { FC, memo } from 'react';
import { NavIdProps, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import { ProjectAdd } from 'src/modules/Project/ProjectAdd';
import { ProjectCtrl } from 'src/modules/Project/project_ctrl';

export const ProjectAddPage: FC<NavIdProps> = memo((props: NavIdProps) => {
  const projectCtrl = ProjectCtrl.getInstance();
  return (
    <Panel className="Panel__fullScreen" {...props}>
      <PanelHeader
        delimiter="none"
        before={<PanelHeaderBack onClick={() => projectCtrl.goBack()} />}
      >
        Новый проект
      </PanelHeader>
      <ProjectAdd />
    </Panel>
  );
});

ProjectAddPage.displayName = 'ProjectAddPage';
