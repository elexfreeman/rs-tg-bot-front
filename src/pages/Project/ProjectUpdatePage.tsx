import { FC, memo } from 'react';
import { NavIdProps, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import { ProjectUpdate } from 'src/modules/Project/ProjectUpdate';
import { ProjectCtrl } from 'src/modules/Project/project_ctrl';
import { useParams } from '@vkontakte/vk-mini-apps-router';

export const ProjectUpdatePage: FC<NavIdProps> = memo((props: NavIdProps) => {
  const projectCtrl = ProjectCtrl.getInstance();
  const params = useParams<'project_id'>();
  return (
    <Panel className="Panel__fullScreen" {...props}>
      <PanelHeader
        delimiter="none"
        before={<PanelHeaderBack onClick={() => projectCtrl.goBack()} />}
      >
        Новый проект
      </PanelHeader>
      <ProjectUpdate projectId={Number(params?.project_id)} />
    </Panel>
  );
});

ProjectUpdatePage.displayName = 'ProjectUpdatePage';
