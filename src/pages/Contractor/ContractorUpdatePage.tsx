import { FC, memo } from 'react';
import { useRouteNavigator, useParams } from '@vkontakte/vk-mini-apps-router';
import { NavIdProps, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import { ContractorUpdate } from 'src/modules/Contractor/ContractorUpdate';

export const ContractorUpdatePage: FC<NavIdProps> = memo((props: NavIdProps) => {
  const routeNavigator = useRouteNavigator();
  const params = useParams<'contractor_id'>();

  const goBack = () => {
    routeNavigator.back();
  }


  return (
    <Panel className="Panel__fullScreen" {...props}>
      <PanelHeader
        delimiter="none"
        before={<PanelHeaderBack onClick={() => goBack()} />}
      >
        Редактирование контрагента
      </PanelHeader>
      <ContractorUpdate contractorId={Number(params?.contractor_id)} />
    </Panel>
  );
});

ContractorUpdatePage.displayName = 'ContractorUpdatePage';
