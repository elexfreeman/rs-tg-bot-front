import { FC, memo, useEffect } from 'react';
import {
  NavIdProps,
  Panel,
  PanelHeader,
  Group,
  PanelHeaderBack,
} from '@vkontakte/vkui';
// import { Icon20User,Icon24WalletOutline } from '@vkontakte/icons'
import { ProjectCtrl } from './project_ctrl';
import { ProjectI } from 'src/api/project_api';
import { ProjectAddEditForm } from './ProjectAddEditForm';
import { useProjectStore } from 'src/store/project.store';
import { useParams } from '@vkontakte/vk-mini-apps-router';

export const ProjectUpdate: FC<NavIdProps> = memo((props: NavIdProps) => {
  const projectStore = useProjectStore();
  const projectCtrl = ProjectCtrl.getInstance();
    const params = useParams<'project_id'>();

  useEffect(() => {
    projectCtrl.infoProject(Number(params?.project_id));
  }, []);

  const newProject: Partial<ProjectI> = {
    ...projectStore.info.data,
  };

  return (
    <Panel className="Panel__fullScreen" {...props}>
      <PanelHeader
        delimiter="none"
        before={<PanelHeaderBack onClick={() => projectCtrl.goBack()} />}
      >
        Редактировать проект
      </PanelHeader>
      <Group description="">
        <ProjectAddEditForm project={newProject} isUpdate />
      </Group>
    </Panel>
  );
});

ProjectUpdate.displayName = 'ProjectUpdate';
