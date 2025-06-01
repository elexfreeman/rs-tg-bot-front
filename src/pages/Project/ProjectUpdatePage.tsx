import { FC, memo } from 'react';
import { useRouteNavigator, useParams } from '@vkontakte/vk-mini-apps-router';
import { NavIdProps, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import { ProjectUpdate } from 'src/modules/Project/ProjectUpdate';

export const ProjectUpdatePage: FC<NavIdProps> = memo((props: NavIdProps) => {
  const routeNavigator = useRouteNavigator();
  const params = useParams<'project_id'>();

  const goBack = () => {
    routeNavigator.back();
  }

  return (
    <Panel className="Panel__fullScreen" {...props}>
      <PanelHeader
        delimiter="none"
        before={<PanelHeaderBack onClick={() => goBack()} />}
      >
        Новый проект
      </PanelHeader>
      <ProjectUpdate projectId={Number(params?.project_id)} />
    </Panel>
  );
});

ProjectUpdatePage.displayName = 'ProjectUpdatePage';
