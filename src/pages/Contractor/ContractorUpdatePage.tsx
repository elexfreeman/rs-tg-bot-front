import { FC, memo } from 'react';
import { NavIdProps, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import { ContractorUpdate } from 'src/modules/Contractor/ContractorUpdate';
import { ContractorCtrl } from 'src/modules/Contractor/contractor_ctrl';
import { useParams } from '@vkontakte/vk-mini-apps-router';

export const ContractorUpdatePage: FC<NavIdProps> = memo((props: NavIdProps) => {
  const contractorCtrl = ContractorCtrl.getInstance();
  const params = useParams<'contractor_id'>();
  return (
    <Panel className="Panel__fullScreen" {...props}>
      <PanelHeader
        delimiter="none"
        before={<PanelHeaderBack onClick={() => contractorCtrl.goBack()} />}
      >
        Редактирование контрагента
      </PanelHeader>
      <ContractorUpdate contractorId={Number(params?.contractor_id)} />
    </Panel>
  );
});

ContractorUpdatePage.displayName = 'ContractorUpdatePage';
