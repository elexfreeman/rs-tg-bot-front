import { FC, memo } from 'react';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
} from '@vkontakte/vkui';
import { ContractorInfo } from 'src/modules/Contractor/ContractorInfo';

export const ContractorInfoPage: FC<NavIdProps> = memo((props: NavIdProps) => {
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
        Контрагент
      </PanelHeader>
      <ContractorInfo />
    </Panel>
  );
});

ContractorInfoPage.displayName = 'ContractorInfoPage';
