import { FC, memo } from 'react';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { NavIdProps, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import { ContractorAdd } from 'src/modules/Contractor/ContractorAdd';

export const ContractorAddPage: FC<NavIdProps> = memo((props: NavIdProps) => {
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
        Новый контагент
      </PanelHeader>
      <ContractorAdd />
    </Panel>
  );
});

ContractorAddPage.displayName = 'ContractorAddPage';
