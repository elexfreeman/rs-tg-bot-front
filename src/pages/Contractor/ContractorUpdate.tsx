import { FC, memo, useEffect } from 'react';
import {
  NavIdProps,
  Panel,
  PanelHeader,
  Group,
  PanelHeaderBack,
} from '@vkontakte/vkui';
// import { Icon20User,Icon24WalletOutline } from '@vkontakte/icons'
import { ContractorCtrl } from './contractor_ctrl';
import { ContractorI } from 'src/api/contractor_api';
import { ContractorAddEditForm } from './ContractorAddEditForm';
import { useContractorStore } from 'src/store/contractor.store';
import { useParams } from '@vkontakte/vk-mini-apps-router';

export const ContractorUpdate: FC<NavIdProps> = memo((props: NavIdProps) => {
  const contractorStore = useContractorStore();
  const contractorCtrl = ContractorCtrl.getInstance();
    const params = useParams<'contractor_id'>();

  useEffect(() => {
    contractorCtrl.infoContractor(Number(params?.contractor_id));
  }, []);

  const newContractor: Partial<ContractorI> = {
    ...contractorStore.info.data,
  };

  return (
    <Panel className="Panel__fullScreen" {...props}>
      <PanelHeader
        delimiter="none"
        before={<PanelHeaderBack onClick={() => contractorCtrl.goBack()} />}
      >
        Редактировать контрагента
      </PanelHeader>
      <Group description="">
        <ContractorAddEditForm contractor={newContractor} isUpdate />
      </Group>
    </Panel>
  );
});

ContractorUpdate.displayName = 'ContractorUpdate';
