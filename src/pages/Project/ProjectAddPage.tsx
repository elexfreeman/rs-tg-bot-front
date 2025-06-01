import { FC, memo } from 'react';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { NavIdProps, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import { ProjectAdd } from 'src/modules/Project/ProjectAdd';

export const ProjectAddPage: FC<NavIdProps> = memo((props: NavIdProps) => {
  const routeNavigator = useRouteNavigator();

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
      <ProjectAdd />
    </Panel>
  );
});

ProjectAddPage.displayName = 'ProjectAddPage';
