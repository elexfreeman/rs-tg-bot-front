import { FC, memo } from 'react';
import {NavIdProps, Panel, PanelHeader, Group, PanelHeaderBack } from '@vkontakte/vkui';
// import { Icon20User,Icon24WalletOutline } from '@vkontakte/icons'
import { ProjectCtrl } from './project_ctrl';
import { ProjectI } from 'src/api/project_api';
import { ProjectAddEditForm } from './ProjectAddEditForm';

export const ProjectAdd: FC<NavIdProps> = memo(
  (props: NavIdProps) => {
    const newProject: ProjectI = {
      id: 0,
      caption: '',
      description: '',
    };

  const projectCtrl = ProjectCtrl.getInstance();
    return (
      <Panel className="Panel__fullScreen" {...props}>
        <PanelHeader
          delimiter="none"
          before={<PanelHeaderBack onClick={() => projectCtrl.goBack()} />}
        >
          Новый проект
        </PanelHeader>
        <Group description="">
          <ProjectAddEditForm project={newProject} />
        </Group>
      </Panel>
    );
  }
);

ProjectAdd.displayName = 'ProjectAdd';
